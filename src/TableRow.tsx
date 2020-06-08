import * as React from 'react';
import {RowDataState} from "./App";
import {Dispatch, SetStateAction} from "react";

interface TableRowProps {
    rowData: RowDataState
    rowIndex: number
    setRowData: Dispatch<SetStateAction<RowDataState[]>>
    deleteRow: () => void;
}

const TableRow = ( props : TableRowProps ) => {
    const { rowData, rowIndex, setRowData, deleteRow } = props;
    const { Email, ID, Name } = rowData;

    const onClickDeleteHandler = deleteRow;

    const onClickEditHandler = () => {
        setRowData( prevState => {
            let prevRowState = prevState.filter( ( _, index : number ) => rowIndex === index )[0];
            prevRowState = {
                ...prevRowState,
                Name: "Name was edited" //NOTE: just a lazy example
            }
            return prevState;
        } );
    }

    return (
        <tr>
            <td>{ Email }</td>
            <td>{ ID }</td>
            <td>{ Name }</td>
            <button onClick={ onClickDeleteHandler }>
                Delete
            </button>
            <button onClick={ onClickEditHandler }>
                Edit
            </button>
        </tr>
    );
}

export default TableRow;