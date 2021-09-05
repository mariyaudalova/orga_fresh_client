import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

import styles from "./FilterItem.module.scss";
import { ListItemType } from "./types";
import { FilterItem } from "../../common/types";

interface FilterList {
  filterName: string;
  filterEntityList: Array<FilterItem>;
  changeFilterEntityHandler: (props: FilterItem) => void;
}

const WithFilters = (ListItem: ListItemType) => {
  const Filter = ({
    changeFilterEntityHandler,
    filterEntityList,
    filterName,
  }: FilterList) => {
    const GreenCheckbox = withStyles({})((props: CheckboxProps) => (
      <Checkbox color="primary" {...props} />
    ));
    return (
      <div className={styles.filterItemContainer}>
        <p className={styles.filterName}>{filterName}</p>
        <ul className={styles.listContainer}>
          {filterEntityList.map((filterEntity, index) => {
            return (
              <li
                key={index}
                className={
                  filterEntity.isActive ? styles.active : styles.listItem
                }
              >
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={filterEntity.isActive}
                      onChange={(event) => {
                        changeFilterEntityHandler({
                          ...filterEntity,
                          isActive: event.target.checked,
                        });
                      }}
                      name="checkedG"
                    />
                  }
                  label={<ListItem value={filterEntity.uiLabel} />}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return Filter;
};

export { WithFilters };
