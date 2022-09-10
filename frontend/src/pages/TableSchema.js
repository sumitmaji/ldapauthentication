import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTableSchemaAsync } from "../redux/reducers/tableschema/tableschema.thunk";
import { loadLicensesAsync } from "../redux/reducers/licenses/licenses.thunk";
import _ from "lodash";
import cx from "classnames";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { loadTableDefAsync } from "../redux/reducers/tabledef/tabledef.thunk";
import TableForm from "./TableForm";
import connectRest from "../redux/restComponentConnect";

const TableSchemaListing = (props) => {
  //Ussig rest api connect
  // const dispatch = useDispatch();
  // const { isLoading, data, errorMessage } = useSelector(
  //   (state) => state.tableSchema
  // );

  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);

  //Using rest api connect
  // const {
  //   isLoading: defIsLoading,
  //   data: defData,
  //   errorMessage: defEffMsg,
  // } = useSelector((state) => state.tableDef);

  const [defData, setDefData] = useState({});

  const [tableName, setTableName] = useState("");

  useEffect(() => {
    //Using rest api conect
    // dispatch(loadTableSchemaAsync());

    props.tableActions.load({}, "load").then((res) => {
      const data = _.chain(res.payload.data)
        .mapKeys("name")
        .mapValues((o) => {
          return { ...o.columns };
        })
        .value();
      setData(data);
    });

    //Using rest api connect
    // dispatch(loadTableDefAsync());

    props.tableActions.load({}, "def").then((res) => {
      setDefData(res.payload.data);
    });
  }, []);

  const updateTableName = (name) => {
    setTableName(name);
  };

  return (
    <>
      <h1>Table Schema Listing</h1>
      {errorMessage && <h3>{errorMessage}</h3>}

      <div className="row">
        <div className="col s1">
          <TableLeftBar data={data} updateTableName={updateTableName} />
        </div>
        <div className="col s11">
          <TableCenter data={data} tableName={tableName} defData={defData} />
        </div>
      </div>
    </>
  );
};

const TableLeftBar = ({ data, updateTableName }) => {
  return (
    <>
      {_.map(data, (value, key) => {
        return (
          <div key={key}>
            <div className="divider"></div>
            <div className="section" onClick={() => updateTableName(key)}>
              <h5>{key}</h5>
            </div>
          </div>
        );
      })}
    </>
  );
};

const TableCenter = (props) => {
  const [columns, setColumns] = useState(true);
  const [data, setData] = useState(false);
  const [activeTag, setActiveTag] = useState("tag-1");
  const [tabNo, setTabNo] = useState(0);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", setRefresh(!refresh));
    return () => {
      window.addEventListener("resize", setRefresh(!refresh));
    };
  }, []);

  const onClick = (tab, tabNo) => {
    if (tab.target.innerHTML === "Columns") {
      setData(false);
      setColumns(true);
    } else if (tab.target.innerHTML === "Data") {
      setColumns(false);
      setData(true);
    }

    setActiveTag(tab.target.id);
    setTabNo(tabNo);
  };

  const { data: tableData, tableName, defData } = props;

  const { left, top, width, height } = document.getElementById(activeTag)
    ? document.getElementById(activeTag).getBoundingClientRect()
    : { left: 0, top: 0, width: 0, height: 0 };

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <ul className="tabs z-depth-1">
            <li
              className="tab col s3"
              id="tab-1"
              onClick={(e) => onClick(e, 0)}
            >
              <a
                className={cx({ active: columns, anchorPointer: true })}
                id="tag-column"
              >
                Columns
              </a>
            </li>
            <li
              className="tab col s3"
              id="tab-2"
              onClick={(e) => onClick(e, 1)}
            >
              <a
                className={cx({ active: data, anchorPointer: true })}
                id="tag-data"
              >
                Data
              </a>
            </li>
            <li className="indicator" style={{ left: width * tabNo, width }} />
          </ul>
        </div>
      </div>
      {columns && <Columns data={tableData} tableName={tableName} />}
      {data && <RestTableData schemaData={defData} tableName={tableName} />}
    </div>
  );
};

const Columns = (props) => {
  const { data, tableName } = props;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Data Type</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            _.map(data[tableName], (v, k) => {
              return (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

const TableData = (props) => {
  // Using rest api connect
  // const dispatch = useDispatch();
  // const { isLoading, data, errorMessage } = useSelector(
  //   (state) => state.licenses
  // );

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [row, setRow] = useState([]);

  useEffect(() => {
    //Using rest api connect
    //dispatch(loadLicensesAsync());
    setLoading(true);
    props[`${props.tableName}Actions`].list({}).then((res) => {
      setData(res.payload.data._embedded[props.tableName]);
      setLoading(false);
    });
  }, [props.tableName]);

  const { schemaData, tableName } = props;
  const colConfig = schemaData && schemaData[tableName];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!isLoading && data && (
        <DataGrid
          rows={data}
          columns={colConfig}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={(params) => {
            setRow(params.row);
          }}
        />
      )}

      <div className="row">
        <div class="col s1">
          <button
            data-target="modal1"
            className="btn modal-trigger"
            onClick={() => {
              handleOpen();
            }}
          >
            <i className="material-icons">edit</i>
          </button>
        </div>
        <div class="col s1">
          <button
            data-target="modal1"
            className="btn modal-trigger"
            onClick={() => {
              handleOpen();
              setRow({})
            }}
          >
            <i className="material-icons">add</i>
          </button>
        </div>
        <div class="col s1">
          <button
            data-target="modal1"
            className="btn modal-trigger"
            onClick={() => {
              handleOpen();
            }}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </div>

      <TableForm
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        fieldConfig={colConfig}
        row={row}
        tableName={props.tableName}
      />
    </div>
  );
};

const withRestConnect = (props) => (WrappedComponent) => {
  const RestComponent = connectRest(
    props.tableName,
    {},
    "id"
  )(WrappedComponent);
  return <RestComponent {...props} />;
};

const RestTableData = (props) => withRestConnect({ ...props })(TableData);

export default connectRest("table", {}, "id")(TableSchemaListing);
