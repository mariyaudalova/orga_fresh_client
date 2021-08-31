import React, {FunctionComponent} from "react";

export interface FilterEntitiy {
    isActive: boolean;
    uiLabel: string;
}

export type ListItemType = FunctionComponent<{value: string}>;
