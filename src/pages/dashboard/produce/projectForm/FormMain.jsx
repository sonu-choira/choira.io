import React, { Component } from "react";
import FormA from "./FormA";
import FormB from "./FormB";
import FormC from "./FormC";
import FormD from "./FormD";
import FormE from "./FormE";
import FormF from "./FormF";
import axios from "axios";
import Swal from "sweetalert2";
import { httpUrl, nodeUrl } from '../../../../restservice'

let sendableData = {
  customer: 15,
  name: "",
  projecttype: "",
  genre: "",
  faqs: "",
  details: "",
  price: 0,
  status: "IN_ACTIVE",
  paymentstatus: "NOT_COMPLETED",
  links: [{
    link: "https://www.youtube.com/"
  }],

}

let lengthdefine
let priceTable;
let random1
// let genreTable = [];

let customerPhone = 12345678

class FormMain extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateOtp = this.generateOtp.bind(this);


    this.handleFormA = this.handleFormA.bind(this);
    this.handleFormB = this.handleFormB.bind(this);
    this.handleFormC = this.handleFormC.bind(this);
    this.handleFormD = this.handleFormD.bind(this);

    this.getGenreData = this.getGenreData.bind(this);


    this.state = {
      page: 1,
      otp: '1234',
      genreTable: [],
      data: [],
    };

    this.getData()
    this.updateTable()
    this.getGenreData()
    // this.loadData1()
  }
  loadData1 = () => {
    let userid = JSON.parse(localStorage.getItem("userData")).id;
    axios.get(httpUrl + 'project?customer=' + userid)
      .then(responce => {
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        console.log(responce)
      });
  }
  updateTable = () => {
    axios.get(httpUrl + 'project')
      .then(responce => {
        this.setState({
          data: responce.data
        })
        lengthdefine = this.state.data.length
        console.log(lengthdefine)
        console.log(responce.data)
      });
  }

  nextPage(val) {
    console.clear()
    console.log(val)
    let otpSubmitted = val.otp1 + val.otp2 + val.otp3 + val.otp4
    console.log(otpSubmitted)
    if (this.state.otp === otpSubmitted) {
      let jsonData = {
        id: JSON.parse(localStorage.getItem('userData')).id,
        phone: val["phone 1"],
        city: "Mumbai"
      }
      axios.post(httpUrl + 'customer/update', jsonData)
        .then((result) => {
          console.log(result.data)
        });
      this.setState({ page: this.state.page + 1 });
    } else {
      Swal.fire({
        icon: 'warning',
        title: "Wrong OTP",
        text: "OTP send to your mobile number, Please check and provide correct OTP.",
        showConfirmButton: false,
        timer: 5500
      });
    }
  }

  handleFormA(val) {
    sendableData.customer = JSON.parse(localStorage.getItem('userData')).id

    sendableData.name = this.capitalizeFirstLetter(val.name)

    sendableData.projecttype = document.getElementById('option-select-1').value;

    sendableData.genre = document.getElementById('option-select-2').value;

    sendableData.faqs = document.getElementById('option-select-3').value;

    this.setState({ page: this.state.page + 1 });
  }

  handleFormB(val) {
    if (val.link_share) {
      sendableData.links[0].link = val.link_share
    } else {
      delete sendableData.links;
    }
    console.log("sendableData", sendableData)
    sendableData.details = val.additional
    this.setState({ page: this.state.page + 1 });
  }

  getFile(file) {

    var digits = '0123456789';
    random1 = '';
    for (let i = 0; i < 2; i++) {
      random1 += digits[Math.floor(Math.random() * 10)];
    }
    console.log(random1)
    // let text
    // text = this.state.lengthdefine
    // console.log(text)
    // text = this.state.lengthdefine
    // let p = text+1

    let insertData = {
      docname: random1 + '_' + file.name,
      doctype: "AUDIO/VIDEO",
      docpath: "Project/" + JSON.parse(localStorage.getItem('userData')).id + '/' + random1 + '_' + file.name
    }
    const BASE_URL = httpUrl + 'common/doc/upload';

    const formData = new FormData();
    formData.append('doc', file, random1 + '_' + file.name);
    formData.append('name', "Project/" + JSON.parse(localStorage.getItem('userData')).id);
    formData.append('width', '')
    formData.append('height', '')
    axios.post(BASE_URL, formData).then(response => {
      console.log("response--------------")
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: "success",
          text: "File Upload successfully.",
          showConfirmButton: false,
          timer: 1000
        });
      }
      else {
        this.openSweetAlertDanger("");
        Swal.fire({
          icon: 'warning',
          title: "Failed",
          text: "File Not Uploaded!",
          showConfirmButton: false,
          timer: 5500
        });
      }

    }).catch(err => {
      this.openSweetAlertDanger("The maximum file size allowed is 25MB!");
    });
    sendableData['file'] = insertData

    console.log("file::::", sendableData)
  }

  handleFormC(val) {
    sendableData.price = val.check
    console.log(sendableData)
    this.generateOtp()
    this.setState({ page: this.state.page + 1 });
  }

  handleFormD(val) {
    this.setPhoneNumber(val["phone 1"])
    let smsData = {
      toMobile: "91" + val["phone 1"],
      message: "Your OTP for verification is: " + this.state.otp + ". Choira"
    }
    axios.post(httpUrl + 'sms/send', smsData)
      .then((result) => {
        console.log(result.data)
      });
    console.log(val)
    console.log(this.state.otp)
    this.setState({ page: this.state.page + 1 });
  }

  generateOtp() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.setState({ otp: OTP });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handleSubmit(values) {
    axios.post(httpUrl + 'project', sendableData)
      .then((result) => {
        let responseJson = result.data;
        console.log(responseJson)
        this.sendMessage(responseJson)
        this.getPriceName()

        Swal.fire({
          icon: 'success',
          title: "Project created.",
          text: "Your Project submitted successfully.",
          showConfirmButton: false,
          timer: 5500
        });
        this.props.toggleModals()
        this.props.changePage()
        this.loadData1()
        // window.location.reload()
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: "Project Already Exist",
          text: "Change the name of the project you entered and try again.",
          showConfirmButton: false,
          timer: 5500
        });
        this.props.toggleModals()
        this.props.changePage()
      });
  }

  getPriceName() {
    axios.get(httpUrl + 'project/price/' + sendableData.price)
      .then((result) => {
        let responseJson = result.data;
        this.sendMail(this.toTitleCase(responseJson.pricetype))
      });
  }

  sendMail(serviceName) {

    let sendMailData = {
      email: JSON.parse(localStorage.getItem('userData')).email,
      uName: JSON.parse(localStorage.getItem('userData')).name,
      pName: sendableData.name,
      pDescription: sendableData.details,
      service: serviceName
    }

    axios.post(nodeUrl + 'projectCreated', sendMailData)
      .then(responce => {
        console.log(responce.data)
        // window.location.reload()
      });
  }

  sendMessage(project) {
    sessionStorage.removeItem("project")
    if (sessionStorage.getItem('proname')) {
      let coutdata = Number(sessionStorage.getItem('proname')) + 1
      sessionStorage.setItem('proname', coutdata);
    } else {
      sessionStorage.setItem('proname', 1);
    }
    sessionStorage.setItem('project', project.name);
  }

  // sendMessage(project) {
  //   if (project.name !== "" && project.name !== null) {

  //     let sendableData = {
  //       pname: project.name,
  //       pid: project.id
  //     }
  //     axios.post(nodeUrl + 'sendSMS', sendableData)
  //       .then((result) => {
  //         setOtpButton(false)
  //       });
  //   }
  //   else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Please enter email id',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   }
  // }

  getData() {
    axios.get(httpUrl + 'project/price')
      .then((result) => {
        let responseJson = result.data;
        console.log(responseJson)
        priceTable = responseJson
        console.log("responseJson")
        console.log(priceTable)
      });
  }


  getPriceTable() {
    return priceTable;
  }

  getGenreData() {
    axios.get(httpUrl + 'genre')
      .then((result) => {
        let responseJson = result.data;
        this.setState({ genreTable: responseJson })
      });
  }

  getPhoneNumber() {
    return customerPhone;
  }

  setPhoneNumber(number) {
    customerPhone = number;
  }

  toTitleCase(str) {
    if (str) {
      let convertedStr = str.replaceAll("_", " ");
      return convertedStr.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }
    else {
      return ""
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setLinkTable(array) {
    console.log(array)
  }

  getProjectName = () => {
    return sendableData.name
  }

  closeModel = () => {
    this.props.toggleModals()
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        {page === 1 &&
          <FormA
            onSubmit={this.handleFormA}
            closeModel={this.closeModel}
            additionalData={this.state.genreTable}
            forStringFun={this.toTitleCase} />}
        {page === 2 && (
          <FormB
            previousPage={this.previousPage}
            onSubmit={this.handleFormB}
            linkTable={this.setLinkTable}
            closeModel={this.closeModel}
            getFile={this.getFile}
          />
        )}

        {page === 3 && (
          <FormC
            previousPage={this.previousPage}
            onSubmit={this.handleFormC}
            additionalData={this.getPriceTable}
            forStringFun={this.toTitleCase}
            closeModel={this.closeModel}
          />
        )}
        {page === 4 && (
          <FormD
            previousPage={this.previousPage}
            onSubmit={this.handleFormD}
            additionalData={this.getPhoneNumber}
            closeModel={this.closeModel}
          />
        )}
        {page === 5 && (
          <FormE
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            additionalData={this.getPhoneNumber}
          />
        )}
        {page === 6 && (
          <FormF
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
            getName={this.getProjectName}
          />
        )}
      </div>
    );
  }
}

export default FormMain;
