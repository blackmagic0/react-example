import * as React from 'react';
import { useEffect, useState } from 'react';
import TableRow from "./TableRow";

const axios = require('axios').default;

export interface RowDataState {
  Email: string
  ID: number
  Name: string
}

interface ResponseData {
  config: any
  data: RowDataState[]
  headers: any
  request: any
  status: number
  statusText: string
}

const App = () => {
  const [data,setData] = useState<RowDataState[]>([]);

  const requestData = async () => {
    await axios({
      method: 'POST',
      url: 'https://app.fakejson.com/q',
      data: {
        token: 'AKI_GrHR7WwjLreZP4oF4Q',
        data: {
          Name: 'name',
          ID: 'numberInt',
          Email: 'internetEmail',
          _repeat: 15,
        },
      },
      responseType: 'application/json',
      withCredentials: true,
    }).then((response: ResponseData) => {
      setData(response.data);
    });
  };

  useEffect( () => { requestData().catch(console.error) }, []);

  const deleteRow = ( rowIndexToDelete : number ) => {
    setData( ( prevState => prevState.filter( ( _, index ) => index !== rowIndexToDelete ) ) );
  }

  return (
      <table>
        <thead>

        </thead>
        <tbody>
         { data.map( ( rowData : RowDataState, index : number ) =>
             <TableRow
                 key={ index }
                 deleteRow={ () => deleteRow( index ) }
                 rowData={ rowData }
                 rowIndex={ index }
                 setRowData={ setData }
             />
         ) }
        </tbody>
      </table>
  );
};

export default App;
