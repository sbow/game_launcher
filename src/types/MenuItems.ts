// MenuItems.ts
// A dataclass for menu trees

export enum MenuItemEnum {
    MultChoice,
    Asteroids,
    RobotEqScene,
}

export interface MenuItems {
    item: MenuItemEnum;
    text: string;
    scene_key?: string; // ie: set in constructor(), key: 'MyScene'
    visited?: boolean; // ie: set to True if it's been visited
}

export const STARTMENU: MenuItems[] = [
    {
        item: MenuItemEnum.MultChoice,
        text: "Multiple Choice",
    },
    {
        item: MenuItemEnum.Asteroids,
        text: "Asteroids",
    },
    {
        item: MenuItemEnum.RobotEqScene,
        text: "Robot Dance Party",
    }
]