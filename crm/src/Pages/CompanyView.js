import { useState, useEffect } from "react";
import "./CompanyView.css";
import Item from "../Components/Item";

function CompanyView({axiosJWT}) {
    const [companies, setCompanies] = useState([]);

    async function getCompany() {
        const res = await axiosJWT.get(
            `http://localhost:${process.env.REACT_APP_PORT || 5000}/company/all`, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
            }
        );
        return await res.data;
    }

    useEffect(() => {
        getCompany().then((res) => {
            for(let i = 0; i < res.length; i++) {
                res[i].tocall = res[i].tocall.split("T")[0];
            }
            setCompanies(res);
        });
    }, []);

    return (
        <div className="company-form">
            <div className="company-div">
                {companies !== undefined ? (
                    companies.map((comp) => (
                    <li className="company-text" key={comp.id}>
                        <Item data={comp} />
                        <div className="comp-button">
                            <div className="company-backround">
                                <a className="detail-text">
                                    {comp.tocall}
                                </a>
                            </div>
                            <button className="company-backround">
                                <a className="detail-text" href={`/company/edit/${comp.name}`}>
                                    Edit
                                </a>
                            </button>
                        </div>
                    </li>
                    ))
                ) : (
                    <div>Nothing to show</div>
                )}
            </div>
        </div>
    );
}

export default CompanyView;