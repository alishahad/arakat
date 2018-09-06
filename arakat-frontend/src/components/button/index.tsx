import { CircularProgress, Theme, WithStyles, withStyles } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";
import React from "react";
import ButtonType from "../../common/models/button/type";
import ResultType from "../../common/models/request/result-type";

export interface IButtonProps {
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    isSubmit?: boolean;
    label: JSX.Element;
    loading?: boolean;
    onClick?: (event: any) => void;
    result?: ResultType;
    type: ButtonType;
}

const style: any = (theme: Theme) => ({
    buttonProgress: {
        color: green[500],
        left: "50%",
        marginLeft: -12,
        marginTop: -12,
        position: "absolute",
        top: "50%",
      },
    wrapper: {
        position: "relative",
    },
});

type PropWithStyles = IButtonProps & WithStyles<"buttonProgress" | "wrapper">;

const Button: React.SFC<IButtonProps> = ({
    classes,
    ...props
}: PropWithStyles) => (
    <div className={classes.wrapper}>
          <MuiButton
            variant="raised"
            color={props.type === ButtonType.action ? "primary" : props.type === ButtonType.warning ? "secondary" : "default"}
            className={classNames({
                [classes.buttonProgress]: props.result === ResultType.successed,
                [props.className]: props.className && true,
            })}
            type={props.isSubmit ? "submit" : "button"}
            disabled={props.disabled || props.loading}
            onClick={props.onClick}
            fullWidth={props.fullWidth}
          >
            {props.label}
          </MuiButton>
          {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
);

export default withStyles(style, { withTheme: true })(Button);
