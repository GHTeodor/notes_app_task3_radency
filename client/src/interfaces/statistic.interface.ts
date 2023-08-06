export interface IStatistic {
    keys: string[];
    active: { [key: string]: number };
    archived: { [key: string]: number };
}