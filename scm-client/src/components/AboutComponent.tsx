import { FC } from "react";
import { getKeyValues } from "../controllers/AboutController";

localStorage.setItem("about", '[{"author":"Nhat Truong","year":2022}]');

const AboutComponent:FC = () => {
    const aboutArray = JSON.parse(getKeyValues() || '[]');
    const aboutObject = aboutArray[0];
    //console.log(aboutObject);
    const renderKeyValues = () => {
        return Object.keys(aboutObject).map((pair:any, index:number) => {
            return <tr key={index}><td>{pair}</td><td> {aboutObject[pair]}</td></tr>
        })
    }

    return (
        <div>
            <div>Author: {aboutArray[0].author}, year: {aboutArray[0].year}</div>
            <br/>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderKeyValues()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AboutComponent;