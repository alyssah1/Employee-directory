import React, { Component } from "react";
import API from "../utils/API";
import "./style.css";



class TableData extends Component {
    state = {
        default: [],
        employees: [],
        search: ""
    }

    componentDidMount() {
        API.getUsers()
            .then(res => this.setState({ employees: res.data.results }))
            .then(res => this.setState({ default: this.state.employees }))
            .then(res => console.log(this.state.employees))
    }


    filterByName = event => {
        const userName = event.target.value;

        const filteredEmployee = this.state.default.filter(element => element.name.first.includes(userName) || element.name.last.includes(userName));
        this.setState({ employees: filteredEmployee });
    };

    sortByFirstName = () => {
        let sortEmployee = this.state.default;
        sortEmployee.sort(function (a, b) {
            let lastNameA = a.name.first.toUpperCase();
            let lastNameB = b.name.first.toUpperCase();

            if (lastNameA < lastNameB) {
                return -1;
            }
            if (lastNameA > lastNameB) {
                return 1;
            }
            return 0
        })
        this.setState({ employees: sortEmployee })
    }
    render() {
        return (
            <>
                <nav className="navbar navbar-light justify-content-center" style={{backgroundColor: "#003366"}}>
                    <form class Name="form-inline">
                        <input className="form-control" onChange={this.filterByName} placeholder="Search Employee"></input>
                    </form>
                </nav>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th onClick={this.sortByFirstName}>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Location</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(e => (
                                <tr>
                                    <td><img src={e.picture.thumbnail} alt={e.name.first} /></td>
                                    <td>{e.name.first} {e.name.last}</td>
                                    <td>{e.phone}</td>
                                    <td>{e.email}</td>
                                    <th>{e.location.city}, {e.location.state}</th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default TableData;
