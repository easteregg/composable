
//! Autogenerated weights for `collective`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2023-02-14, STEPS: `50`, REPEAT: 10, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! HOSTNAME: `3402fc38d7bc`, CPU: `Intel(R) Xeon(R) CPU @ 3.10GHz`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("composable-dev"), DB CACHE: 1024

// Executed Command:
// /nix/store/7as5b27dws6pfhhpjrs68qfvfx2ldcli-composable/bin/composable
// benchmark
// pallet
// --chain=composable-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=10
// --output=code/parachain/runtime/composable/src/weights

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `collective`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> collective::WeightInfo for WeightInfo<T> {
	// Storage: Council Members (r:1 w:1)
	// Storage: Council Proposals (r:1 w:0)
	// Storage: Council Prime (r:0 w:1)
	// Storage: Council Voting (r:100 w:100)
	/// The range of component `m` is `[0, 100]`.
	/// The range of component `n` is `[0, 100]`.
	/// The range of component `p` is `[0, 100]`.
	fn set_members(m: u32, _n: u32, p: u32, ) -> Weight {
		// Minimum execution time: 32_974 nanoseconds.
		Weight::from_ref_time(33_129_000)
			// Standard Error: 134_281
			.saturating_add(Weight::from_ref_time(8_181_542).saturating_mul(m.into()))
			// Standard Error: 134_281
			.saturating_add(Weight::from_ref_time(11_807_692).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().reads((1_u64).saturating_mul(p.into())))
			.saturating_add(T::DbWeight::get().writes(2))
			.saturating_add(T::DbWeight::get().writes((1_u64).saturating_mul(p.into())))
	}
	// Storage: Council Members (r:1 w:0)
	/// The range of component `b` is `[2, 1024]`.
	/// The range of component `m` is `[1, 100]`.
	fn execute(b: u32, m: u32, ) -> Weight {
		// Minimum execution time: 33_207 nanoseconds.
		Weight::from_ref_time(35_057_232)
			// Standard Error: 475
			.saturating_add(Weight::from_ref_time(2_540).saturating_mul(b.into()))
			// Standard Error: 4_901
			.saturating_add(Weight::from_ref_time(26_676).saturating_mul(m.into()))
			.saturating_add(T::DbWeight::get().reads(1))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:0)
	/// The range of component `b` is `[2, 1024]`.
	/// The range of component `m` is `[1, 100]`.
	fn propose_execute(b: u32, m: u32, ) -> Weight {
		// Minimum execution time: 36_868 nanoseconds.
		Weight::from_ref_time(36_833_116)
			// Standard Error: 464
			.saturating_add(Weight::from_ref_time(2_176).saturating_mul(b.into()))
			// Standard Error: 4_785
			.saturating_add(Weight::from_ref_time(83_906).saturating_mul(m.into()))
			.saturating_add(T::DbWeight::get().reads(2))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalCount (r:1 w:1)
	// Storage: Council Voting (r:0 w:1)
	/// The range of component `b` is `[2, 1024]`.
	/// The range of component `m` is `[2, 100]`.
	/// The range of component `p` is `[1, 100]`.
	fn propose_proposed(b: u32, m: u32, p: u32, ) -> Weight {
		// Minimum execution time: 48_462 nanoseconds.
		Weight::from_ref_time(49_139_197)
			// Standard Error: 646
			.saturating_add(Weight::from_ref_time(4_666).saturating_mul(b.into()))
			// Standard Error: 6_745
			.saturating_add(Weight::from_ref_time(76_427).saturating_mul(m.into()))
			// Standard Error: 6_660
			.saturating_add(Weight::from_ref_time(401_306).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(4))
			.saturating_add(T::DbWeight::get().writes(4))
	}
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Voting (r:1 w:1)
	/// The range of component `m` is `[5, 100]`.
	fn vote(m: u32, ) -> Weight {
		// Minimum execution time: 55_120 nanoseconds.
		Weight::from_ref_time(60_255_443)
			// Standard Error: 7_252
			.saturating_add(Weight::from_ref_time(94_886).saturating_mul(m.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	/// The range of component `m` is `[4, 100]`.
	/// The range of component `p` is `[1, 100]`.
	fn close_early_disapproved(m: u32, p: u32, ) -> Weight {
		// Minimum execution time: 57_187 nanoseconds.
		Weight::from_ref_time(54_531_643)
			// Standard Error: 5_546
			.saturating_add(Weight::from_ref_time(85_948).saturating_mul(m.into()))
			// Standard Error: 5_408
			.saturating_add(Weight::from_ref_time(359_902).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(3))
			.saturating_add(T::DbWeight::get().writes(3))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	/// The range of component `b` is `[2, 1024]`.
	/// The range of component `m` is `[4, 100]`.
	/// The range of component `p` is `[1, 100]`.
	fn close_early_approved(b: u32, m: u32, p: u32, ) -> Weight {
		// Minimum execution time: 73_850 nanoseconds.
		Weight::from_ref_time(66_396_662)
			// Standard Error: 776
			.saturating_add(Weight::from_ref_time(9_058).saturating_mul(b.into()))
			// Standard Error: 8_211
			.saturating_add(Weight::from_ref_time(89_892).saturating_mul(m.into()))
			// Standard Error: 8_004
			.saturating_add(Weight::from_ref_time(427_823).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(4))
			.saturating_add(T::DbWeight::get().writes(3))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Prime (r:1 w:0)
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	/// The range of component `m` is `[4, 100]`.
	/// The range of component `p` is `[1, 100]`.
	fn close_disapproved(m: u32, p: u32, ) -> Weight {
		// Minimum execution time: 58_609 nanoseconds.
		Weight::from_ref_time(62_729_402)
			// Standard Error: 7_193
			.saturating_add(Weight::from_ref_time(64_440).saturating_mul(m.into()))
			// Standard Error: 7_014
			.saturating_add(Weight::from_ref_time(347_051).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(4))
			.saturating_add(T::DbWeight::get().writes(3))
	}
	// Storage: Council Voting (r:1 w:1)
	// Storage: Council Members (r:1 w:0)
	// Storage: Council Prime (r:1 w:0)
	// Storage: Council ProposalOf (r:1 w:1)
	// Storage: Council Proposals (r:1 w:1)
	/// The range of component `b` is `[2, 1024]`.
	/// The range of component `m` is `[4, 100]`.
	/// The range of component `p` is `[1, 100]`.
	fn close_approved(b: u32, m: u32, p: u32, ) -> Weight {
		// Minimum execution time: 77_075 nanoseconds.
		Weight::from_ref_time(75_597_956)
			// Standard Error: 799
			.saturating_add(Weight::from_ref_time(5_721).saturating_mul(b.into()))
			// Standard Error: 8_446
			.saturating_add(Weight::from_ref_time(87_543).saturating_mul(m.into()))
			// Standard Error: 8_233
			.saturating_add(Weight::from_ref_time(410_457).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(5))
			.saturating_add(T::DbWeight::get().writes(3))
	}
	// Storage: Council Proposals (r:1 w:1)
	// Storage: Council Voting (r:0 w:1)
	// Storage: Council ProposalOf (r:0 w:1)
	/// The range of component `p` is `[1, 100]`.
	fn disapprove_proposal(p: u32, ) -> Weight {
		// Minimum execution time: 32_084 nanoseconds.
		Weight::from_ref_time(36_981_657)
			// Standard Error: 5_499
			.saturating_add(Weight::from_ref_time(393_872).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(3))
	}
}
