
//! Autogenerated weights for `identity`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2022-06-24, STEPS: `50`, REPEAT: 20, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("picasso-dev"), DB CACHE: 1024

// Executed Command:
// ./target/release/composable
// benchmark
// pallet
// --chain=picasso-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=20
// --output=runtime/picasso/src/weights
// --log
// error

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `identity`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> identity::WeightInfo for WeightInfo<T> {
	// Storage: Identity Registrars (r:1 w:1)
	fn add_registrar(r: u32, ) -> Weight {
		(27_104_000 as Weight)
			// Standard Error: 24_000
			.saturating_add((599_000 as Weight).saturating_mul(r as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity IdentityOf (r:1 w:1)
	fn set_identity(r: u32, x: u32, ) -> Weight {
		(64_358_000 as Weight)
			// Standard Error: 131_000
			.saturating_add((311_000 as Weight).saturating_mul(r as Weight))
			// Standard Error: 22_000
			.saturating_add((982_000 as Weight).saturating_mul(x as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity SuperOf (r:1 w:1)
	fn set_subs_new(s: u32, ) -> Weight {
		(50_239_000 as Weight)
			// Standard Error: 16_000
			.saturating_add((7_266_000 as Weight).saturating_mul(s as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().reads((1 as Weight).saturating_mul(s as Weight)))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
			.saturating_add(T::DbWeight::get().writes((1 as Weight).saturating_mul(s as Weight)))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity SuperOf (r:0 w:1)
	fn set_subs_old(p: u32, ) -> Weight {
		(52_230_000 as Weight)
			// Standard Error: 17_000
			.saturating_add((2_249_000 as Weight).saturating_mul(p as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
			.saturating_add(T::DbWeight::get().writes((1 as Weight).saturating_mul(p as Weight)))
	}
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity IdentityOf (r:1 w:1)
	// Storage: Identity SuperOf (r:0 w:32)
	fn clear_identity(r: u32, s: u32, x: u32, ) -> Weight {
		(57_202_000 as Weight)
			// Standard Error: 111_000
			.saturating_add((1_235_000 as Weight).saturating_mul(r as Weight))
			// Standard Error: 16_000
			.saturating_add((2_267_000 as Weight).saturating_mul(s as Weight))
			// Standard Error: 16_000
			.saturating_add((612_000 as Weight).saturating_mul(x as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
			.saturating_add(T::DbWeight::get().writes((1 as Weight).saturating_mul(s as Weight)))
	}
	// Storage: Identity Registrars (r:1 w:0)
	// Storage: Identity IdentityOf (r:1 w:1)
	fn request_judgement(r: u32, x: u32, ) -> Weight {
		(66_977_000 as Weight)
			// Standard Error: 66_000
			.saturating_add((380_000 as Weight).saturating_mul(r as Weight))
			// Standard Error: 11_000
			.saturating_add((1_036_000 as Weight).saturating_mul(x as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity IdentityOf (r:1 w:1)
	fn cancel_request(r: u32, x: u32, ) -> Weight {
		(63_509_000 as Weight)
			// Standard Error: 77_000
			.saturating_add((235_000 as Weight).saturating_mul(r as Weight))
			// Standard Error: 13_000
			.saturating_add((985_000 as Weight).saturating_mul(x as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity Registrars (r:1 w:1)
	fn set_fee(r: u32, ) -> Weight {
		(10_197_000 as Weight)
			// Standard Error: 15_000
			.saturating_add((413_000 as Weight).saturating_mul(r as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity Registrars (r:1 w:1)
	fn set_account_id(r: u32, ) -> Weight {
		(10_459_000 as Weight)
			// Standard Error: 13_000
			.saturating_add((402_000 as Weight).saturating_mul(r as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity Registrars (r:1 w:1)
	fn set_fields(r: u32, ) -> Weight {
		(10_067_000 as Weight)
			// Standard Error: 29_000
			.saturating_add((505_000 as Weight).saturating_mul(r as Weight))
			.saturating_add(T::DbWeight::get().reads(1 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity Registrars (r:1 w:0)
	// Storage: Identity IdentityOf (r:1 w:1)
	fn provide_judgement(r: u32, x: u32, ) -> Weight {
		(46_595_000 as Weight)
			// Standard Error: 79_000
			.saturating_add((136_000 as Weight).saturating_mul(r as Weight))
			// Standard Error: 11_000
			.saturating_add((1_011_000 as Weight).saturating_mul(x as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity IdentityOf (r:1 w:1)
	// Storage: System Account (r:2 w:2)
	// Storage: Identity SuperOf (r:0 w:32)
	fn kill_identity(r: u32, s: u32, _x: u32, ) -> Weight {
		(99_245_000 as Weight)
			// Standard Error: 109_000
			.saturating_add((15_000 as Weight).saturating_mul(r as Weight))
			// Standard Error: 16_000
			.saturating_add((2_226_000 as Weight).saturating_mul(s as Weight))
			.saturating_add(T::DbWeight::get().reads(4 as Weight))
			.saturating_add(T::DbWeight::get().writes(4 as Weight))
			.saturating_add(T::DbWeight::get().writes((1 as Weight).saturating_mul(s as Weight)))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SuperOf (r:1 w:1)
	// Storage: Identity SubsOf (r:1 w:1)
	fn add_sub(s: u32, ) -> Weight {
		(67_628_000 as Weight)
			// Standard Error: 12_000
			.saturating_add((390_000 as Weight).saturating_mul(s as Weight))
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SuperOf (r:1 w:1)
	fn rename_sub(s: u32, ) -> Weight {
		(20_411_000 as Weight)
			// Standard Error: 4_000
			.saturating_add((167_000 as Weight).saturating_mul(s as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(1 as Weight))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SuperOf (r:1 w:1)
	// Storage: Identity SubsOf (r:1 w:1)
	fn remove_sub(s: u32, ) -> Weight {
		(69_963_000 as Weight)
			// Standard Error: 13_000
			.saturating_add((363_000 as Weight).saturating_mul(s as Weight))
			.saturating_add(T::DbWeight::get().reads(3 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
	}
	// Storage: Identity SuperOf (r:1 w:1)
	// Storage: Identity SubsOf (r:1 w:1)
	fn quit_sub(s: u32, ) -> Weight {
		(45_356_000 as Weight)
			// Standard Error: 17_000
			.saturating_add((377_000 as Weight).saturating_mul(s as Weight))
			.saturating_add(T::DbWeight::get().reads(2 as Weight))
			.saturating_add(T::DbWeight::get().writes(2 as Weight))
	}
}
