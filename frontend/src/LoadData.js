import React, { Component } from "react";
import connectRest from "./redux/restComponentConnect";
import "materialize-css/dist/css/materialize.min.css";
import { showLoading, hideLoading } from "./loading/LoadingRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export const userColConfig = [
  {
    dataKey: "id",
    label: "ID",
    width: 150,
    dataType: "number",
  },
];

export class LoadData extends Component {
  
  componentDidMount = () => {
    this.props.showLoading()
    this.props.tableActions.list({}, "load").then((res) => {
      console.log(res.payload);
      this.props.hideLoading()
    });
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            Logo
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Sasss</a>
            </li>
            <li>
              <a href="badges.html">Components</a>
            </li>
            <li>
              <a href="collapsible.html">JavaScript</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
   showLoading: () => dispatch(showLoading()),
   hideLoading: () => dispatch(hideLoading())
});


export default connect(mapStateToProps, mapDispatchToProps)(connectRest("table", {}, "id")(LoadData));
