import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./table.scss";

const Table = () => {
    const [shops, setShops] = useState([]);
    const [monthsValue, setMonthsValue] = useState(Array(12).fill(0));

    useEffect(() => {
        axios(`http://localhost:8080/shops`)
            .then(({ data }) => {
                setShops(data);
            })
            .catch((e) => alert(e));
    }, []);

    const handleChangeValue = (e, shopIdx, monthIdx) => {
        const newShops = [...shops];
        const oldMonthValue = newShops[shopIdx].months[monthIdx].value || 0;
        const diff = +e.target.value - oldMonthValue;
        newShops[shopIdx].months[monthIdx].value = +e.target.value;
        setShops(newShops);

        const newValueMonth = [...monthsValue];
        newValueMonth[monthIdx] += diff;
        setMonthsValue(newValueMonth);
    };

    const totalByMonth = useMemo(() => {
        return shops.reduce((acc, item) => {
            item.months.forEach((month, monthIdx) => {
                const monthValue = month.value || 0;
                acc[monthIdx] = (acc[monthIdx] || 0) + monthValue;
            });
            return acc;
        }, []);
    }, [shops]);

    return (
        <table className="table">
            <thead className="table__head">
            <tr>
                <th>Shops</th>
                {shops[0]?.months.map(({ id, name }) => (
                    <th key={id}>{name}</th>
                ))}
                <th>Totals</th>
            </tr>
            </thead>
            <tbody>
            {shops.map((item, shopIdx) => (
                <tr key={shopIdx}>
                    <td>{item.store.name}</td>
                    {item.months.map((month, monthIdx) => (
                        <td key={month.id}>
                            <input
                                type="number"
                                min={0}
                                value={month.value || ""}
                                onChange={(e) => handleChangeValue(e, shopIdx, monthIdx)}
                            />
                        </td>
                    ))}
                    <td className="table__total">
                        {item.months.reduce((acc, rec) => {
                            return acc + (rec.value || 0);
                        }, 0)}
                    </td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
                <td></td>
                {totalByMonth.map((item, idx) => (
                    <td className="table__total" key={idx}>
                        {item}
                    </td>
                ))}
                <td></td>
            </tr>
            </tfoot>
        </table>
    );
};

export default Table;