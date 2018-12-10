export interface SettingInterface {
    name: string;
    value: any;
}

export class Settings extends Array<SettingInterface>{
}