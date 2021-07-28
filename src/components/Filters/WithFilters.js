import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

import styles from "./FilterItem.module.scss";

const WithFilters = (ListItem) => {
  const Filter = ({
    changeFilterEntityHandler,
    filterEntityList,
    filterName,
  }) => {
    const GreenCheckbox = withStyles({
      root: {
        color: green[400],
        "&$checked": {
          color: green[600],
        },
      },
      checked: {},
    })((props) => <Checkbox color="default" {...props} />);
    return (
      <div>
        <h2>{filterName}</h2>
        <ul>
          {filterEntityList.map((filterEntity, index) => {
            return (
              <li
                key={index}
                className={
                  filterEntity === filterEntity.isActive
                    ? styles.active
                    : styles.listItem
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

  Filter.propTypes = {
    filterName: PropTypes.string,
    filterEntityList: PropTypes.array,
    changeFilterEntityHandler: PropTypes.func,
    activeValue: PropTypes.object,
    listOfValues: PropTypes.array,
  };

  return Filter;
};

export { WithFilters };
