import React, { Component } from "react";
import { connect } from "react-redux";

class LoadingUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
        this.props.loading.show ? (
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        ): null
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  //   rotateAction: (payload) => dispatch(rotateAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingUI);
