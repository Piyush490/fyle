import React,{ useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Search = () => {

  const useStyle = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 1200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
  const classes = useStyles();
  const cityClass = useStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search , setSearch]=useState('')
  const [bankDetails , setBankDetails]=useState([])
  const [city, setCity] = useState('');
  const [display, setDisplay] = useState(false);
  const columns = [
    { id: 'bank_id', label: 'bank id', minWidth: 100 },
    { id:'bank_name', label: 'bank name' },
    { id: 'ifsc', label: 'ifsc  ⇣', minWidth: 170 },
    {
      id: 'branch',
      label: 'branch',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'address',
      label: 'address',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'city',
      label: 'city',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id:'state', label:'state'  },
    { id:'district', label:'district' }, 
  ];

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);

    if(value === 'all' || value === '')
    return;

    let temp = [];
    bankDetails.map( bank => {
      if(bank.city == value)
      temp.push(bank);
    })

    setBankDetails(temp);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const change = async(value) => {
    setSearch(value)
    if(value === "") {
      setBankDetails([]);
      setDisplay(false);
      return
    }

    const params =new URLSearchParams({
      q: value,
      limit: 1000000,
      offset: 0
    })

    fetch(`/api/branches/autocomplete?${params.toString()}`)
    .then(res => res.json() )
    .then(res => {
       
        if(res.mess){
        setBankDetails([res.mess])
        return
        }
        if(city !='all' && city !=''){
          let bank = [];
          res.map(res=>{
            if(res.city == city)
            bank.push(res);
          })
          res = bank;
        }
        setBankDetails(res);
        setDisplay(true);
        const params =new URLSearchParams({
          q: value,
          limit: 10000000,
          offset: 0
        })

    fetch(`/api/branches?${params.toString()}`)
    .then(res => res.json() )
    .then(res => {
        if(res.mess)
        return

        if(city !='all' && city !='') {
          let bank = [];
          res.map(res=>{
            if(res.city == city)
            bank.push(res);
          })
          res = bank;
        }
        setBankDetails( bankDetails => [...bankDetails, ...res]);
        setDisplay(true);
      })
      .catch(err => {console.log(err);} )
      })
    .catch(err => {console.log(err);} )

  }

    return (
      <div>
        
      <div id="modal1" style={{color:"black", width:"50%",margin:"7%", marginBottom:"0%"}}>

              <div className="modal-content"><span>
                <input type="text" placeholder="search banks"
                onChange={(event) => { change(event.target.value)
                }}
                />
                <FormControl className = {cityClass.formContro}  style={{width:"100px"}}>
                <InputLabel id="demo-simple-select-label"> Select City </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  onChange={handleCityChange}
                >
                  <MenuItem value={'all'}>All Cities</MenuItem>  
                  <MenuItem value={'BANGALORE'}>Bangalore</MenuItem>
                  <MenuItem value={'MUMBAI'}>Mumbai</MenuItem>
                  <MenuItem value={'AGRA'}>Agra</MenuItem>
                  <MenuItem value={'LUCKNOW'}>Lucknow</MenuItem>
                  <MenuItem value={'DELHI'}>Delhi</MenuItem>

                </Select>
              </FormControl>
              </span>
                 </div>
              </div>

            <div id="modal1" style={{color:"black", width:"100%"}}>

              <div className="modal-content">
                {!display &&
                <div style={{margin:'10%', color:'grey'}}>
                  <h3>Banks will appear here</h3>
                  </div>
                }
                {display && 
                  <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bankDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                           
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={bankDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
                }
              </div> 
              {display &&
              <div className="modal-footer" style={{position:'relative', marginBottom:"-10px"}}>
              <button className="modal-close waves-effect waves-green btn-flat"
                onClick={() => {
                  setBankDetails([]);
                  setDisplay(false);
                }}>
                Close
              </button>
            </div>}
            </div>
            </div>
    );
  }

  export default Search