import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    cssLabel: {
        '&$cssFocused': {
            color: "#00695f",
        },
    },
    cssLabelDark: {
        '&$cssFocused': {
            color: "white",
        },
        color: "white"
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#00695f",
        }
    },
    cssUnderlineDark: {
        '&:after': {
            borderBottomColor: "white",
        },
    },
    cssInputDark: {
        color: "white"
    }
});

const CustomTextField = props => {
    const { classes, inputValue, handleInputValueChange, formType, nightmode } = props;

    let placeholder = '';

    if (formType === "board") {
        placeholder = "New board name";
    }
    else if (formType === "item") {
        placeholder = "Add new item";
    }
    else if (formType === "editBoard") {
        placeholder = "Edit board name";
    }
    else if (formType === "editItem") {
        placeholder = "Edit item content";
    }

    return (
        <FormControl>
            <InputLabel
                htmlFor="new-board"
                classes={ 
                nightmode ? 
                {
                    root: classes.cssLabelDark,
                    focused: classes.cssFocused,
                }
                : 
                {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                }}
            >
                { placeholder }
            </InputLabel>
            <Input
                id="new-board"
                classes={
                nightmode ?
                {
                    root: classes.cssInputDark,
                    underline: classes.cssUnderlineDark,
                }
                :
                {
                    underline: classes.cssUnderline,
                }}
                value={inputValue}
                onChange={handleInputValueChange}
            />
        </FormControl>
    );
}

export default withStyles(styles)(CustomTextField);