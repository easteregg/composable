FROM mcr.microsoft.com/vscode/devcontainers/base:0.202.7-bullseye
ARG USER=vscode
ARG UID=1000
ARG GID=${UID}
ARG NIX_INSTALLER=https://releases.nixos.org/nix/nix-2.10.3/install
ARG CHANNEL_URL=https://github.com/NixOS/nixpkgs/archive/aaa1c973c8c189195e1b1a702d3b74dbcde91538.tar.gz
ARG CACHIX_NAME=composable-community

SHELL [ "/bin/bash", "-o", "pipefail", "-o", "errexit", "-c" ]

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get install --yes --no-install-recommends \
    ca-certificates \
    curl \
    sudo \
    xz-utils    

RUN addgroup --system nixbld
RUN for i in $(seq 1 30); do useradd -ms /bin/bash nixbld$i &&  adduser nixbld$i nixbld; done
RUN adduser ${USER} nixbld

RUN usermod --append --groups sudo ${USER} --shell /bin/bash
RUN adduser ${USER} root
RUN sed --in-place 's/%sudo.*ALL/%sudo   ALL=(ALL:ALL) NOPASSWD:ALL/' /etc/sudoers

RUN mkdir --parents /etc/nix/
RUN echo "sandbox = relaxed" >> /etc/nix/nix.conf
RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf
RUN echo "narinfo-cache-negative-ttl = 30" >> /etc/nix/nix.conf 
RUN curl --location ${NIX_INSTALLER} > /install.sh
RUN chmod +x /install.sh
RUN passwd --delete root

USER ${USER}
ENV USER=${USER}

RUN /install.sh
RUN source ~/.nix-profile/etc/profile.d/nix.sh && \
    nix-channel --add ${CHANNEL_URL} nixpkgs && \
    nix-channel --update 

RUN echo "source ~/.nix-profile/etc/profile.d/nix.sh" >> ~/.bashrc && \
    echo "source ~/.nix-profile/etc/profile.d/nix.sh" >> ~/.profile && \
    echo "source ~/.nix-profile/etc/profile.d/nix.sh" >> ~/.bash_profile && \
    echo "source ~/.nix-profile/etc/profile.d/nix.sh" >> ~/.zshrc

WORKDIR /home/${USER}/

COPY --chown=${USER}:${USER} . . 

RUN source ~/.nix-profile/etc/profile.d/nix.sh && \
    nix-env --set-flag priority 10 nix-2.10.3 && \
    export ARCH_OS=$(uname -m)-$(uname -s | tr '[:upper:]' '[:lower:]') && \
    nix build --no-link .#homeConfigurations.vscode.${ARCH_OS}.activationPackage -L --show-trace

# NOTE: nix-env -i cachix  leads to fail of home-manager
# NOTE: likely need to split minimal home and overlay on top larger one
RUN source ~/.nix-profile/etc/profile.d/nix.sh && \
    export ARCH_OS=$(uname -m)-$(uname -s | tr '[:upper:]' '[:lower:]') && \
    "$(nix path-info .#homeConfigurations.vscode.${ARCH_OS}.activationPackage)"/activate && \ 
    cachix use ${CACHIX_NAME} 
  
# RUN echo "" >> /home/${USER}/nix.conf.base && \
#     echo "" >> /home/${USER}/nix.conf.base && \
#     cat ~/.config/nix/nix.conf  >> /home/${USER}/nix.conf.base && \ 
#     echo "" >> /home/${USER}/nix.conf.base && \
#     nix show-config >> /home/${USER}/nix.conf.base