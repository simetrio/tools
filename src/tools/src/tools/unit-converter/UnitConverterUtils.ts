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
}

export enum UnitType {
	DataStorage = "Data Storage",
}

export const UnitGroups: { [unitType: string]: Unit[] } = {
	[UnitType.DataStorage]: [Unit.bit, Unit.b, Unit.KB, Unit.MB, Unit.GB, Unit.TB, Unit.PB, Unit.EB,],
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
}