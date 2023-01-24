import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { getCurrent, setCurrent } from "./endpointStore";
import { endpointPresets } from "./constants";
import { EndpointPreset } from "./types";

export const EndpointPage = () => {
  return (
    <Stack direction="column" gap={4}>
      <Card>
        <Typography variant="h5">Current endpoints</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={"Subsquid Endpoint"}
              secondary={getCurrent("subsquid")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Picasso parachain"}
              secondary={getCurrent("picasso")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Relay chain"}
              secondary={getCurrent("kusama")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Karura parachain"}
              secondary={getCurrent("karura")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Statemine parachain"}
              secondary={getCurrent("statemine")}
            />
          </ListItem>
        </List>
      </Card>
      <Card>
        <Typography variant="h5" mb={4}>
          Update endpoints
        </Typography>
        <Stack gap={4} direction="row">
          {Object.keys(endpointPresets).map((preset, key) => {
            return (
              <Button
                key={key}
                variant="contained"
                onClick={() => setCurrent(preset as EndpointPreset)}
              >
                {preset}
              </Button>
            );
          })}
          <Button variant="outlined" onClick={() => location.reload()}>
            Apply and Refresh
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};
