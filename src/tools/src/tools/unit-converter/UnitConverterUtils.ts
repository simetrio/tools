export const UnitConverterUtils = {
    convert: (value: number, from: Unit, to: Unit): number => convertUnit(value, from, to),
}

function convertUnit(value: number, from: Unit, to: Unit): number {
	if (isNaN(value)) {
		return 0;
	}
	return value * UnitValues[from] / UnitValues[to];
}

export enum Unit {
	// Data storage
	bit = "Bit (b)",
	b = "Byte (B)",
	KB = "Kilobyte (KB)",
	MB = "Megabyte (MB)",
	GB = "Gigabyte (MB)",
	TB = "Terabyte (MB)",
	PB = "Petabyte (MB)",
	EB = "Exabyte (MB)",

	// Time
	tick = "Tick (t)",
	ms = "Milissecond (ms)",
	s = "Second (s)",
	m = "Minute (m)",
	h = "Hour (h)",
	d = "Day (d)",
	M = "Month (M)",
	y = "Year (y)",
}

export enum UnitType {
	DataStorage = "Data Storage",
	Time = "Time",
}

export const UnitGroups: { [unitType: string]: Unit[] } = {
	[UnitType.DataStorage]: [Unit.bit, Unit.b, Unit.KB, Unit.MB, Unit.GB, Unit.TB, Unit.PB, Unit.EB,],
	[UnitType.Time]: [Unit.tick, Unit.ms, Unit.s, Unit.m, Unit.h, Unit.d, Unit.M, Unit.y,],
	// [UnitType.]: [Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit., Unit.,],
}

export const UnitTypes = Object.keys(UnitGroups);

const UnitValues: { [unit: string]: number } = {
	// Data storage
	[Unit.bit]: 1,
	[Unit.b]: 8,
	[Unit.KB]: 8 * 1024,
	[Unit.MB]: 8 * 1024 * 1024,
	[Unit.GB]: 8 * 1024 * 1024 * 1024,
	[Unit.TB]: 8 * 1024 * 1024 * 1024 * 1024,
	[Unit.PB]: 8 * 1024 * 1024 * 1024 * 1024 * 1024,
	[Unit.EB]: 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,

	// Time
	[Unit.tick]: 1,
	[Unit.ms]: 100,
	[Unit.s]: 100 * 1000,
	[Unit.m]: 100 * 1000 * 60,
	[Unit.h]: 100 * 1000 * 60 * 60,
	[Unit.d]: 100 * 1000 * 60 * 60 * 24,
	[Unit.M]: 100 * 1000 * 60 * 60 * 24 * 30.43,
	[Unit.y]: 100 * 1000 * 60 * 60 * 24 * 30.43 * 12,

	// ****
	// [Unit.]: 1,
	// [Unit.]: 1000,
	// [Unit.]: 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000 * 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
	// [Unit.]: 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
}