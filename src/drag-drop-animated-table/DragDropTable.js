import React, { useState, useRef, useEffect } from "react";
import "./DragDropTable.css"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";

const DragDropTable = () => {


  // Avoid a layout jump when reaching the last page with empty rows.
const [anim,setAnim]=useState("")
const [aniIndex,setIndex]=useState('')
  const [list, setList] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

 

  useEffect(() => {
   
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setList(json));
  }, []);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
   
    setDraggedIndex(position) //set dragged index
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log(e.target.innerHTML);
    console.log("drageEnter");
    setIndex(position)
    setAnim("animatn")

  };
  const drageOver=(e,position)=>{
   
    setAnim("")
    setIndex("")
    console.log("drageOver")
  }

  const drop = (e) => {
    const copyListItems = [...list]; // set list in copy array
  
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedIndex("") //color change false when dragged over
    setList(copyListItems);
  };

  return (
    <>
      <div className="cel-table">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {list?.map((row, index) => (
              <div
              className={ `ani-row ${aniIndex == index?anim:""} ${draggedIndex === index ?'Active':''}`}
               
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragLeave={(e)=>drageOver(e,index)}
                onDragEnd={drop}
                key={index}
                draggable
              >
                <TableRow key={row.name}  >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.title}
                  </TableCell>
                </TableRow>
              </div>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            /> */}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};
export default DragDropTable;
