import React, { useMemo, useState} from "react";
import "./table.scss";

const Table = ({data, setData}) => {

    const [monthsValue, setMonthsValue] = useState(Array(12).fill(0));

    const handleChangeValue = (e, shopIdx, monthIdx) => {
        const newShops = [...data];
        const oldMonthValue = newShops[shopIdx].months[monthIdx].value || 0;
        const diff = +e.target.value - oldMonthValue;
        newShops[shopIdx].months[monthIdx].value = +e.target.value;
        setData(newShops);

        const newValueMonth = [...monthsValue];
        newValueMonth[monthIdx] += diff;
        setMonthsValue(newValueMonth);
    };

    const totalByMonth = useMemo(() => {
        return data.reduce((acc, item) => {
            item.months.forEach((month, monthIdx) => {
                const monthValue = month.value || 0;
                acc[monthIdx] = (acc[monthIdx] || 0) + monthValue;
            });
            return acc;
        }, []);
    }, [data]);

    return (
        <table className="table">
            <thead className="table__head">
            <tr>
                <th>Shops</th>
                {data[0]?.months.map(({ id, name }) => (
                    <th key={id}>{name}</th>
                ))}
                <th>Totals</th>
            </tr>
            </thead>
            <tbody>
            {data.sort((a, b) => a.store.id - b.store.id).map((item, shopIdx) => (
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
                <td className="table__total">Totals</td>
                {totalByMonth.map((item, idx) => (
                    <td className="table__total" key={idx}>
                        {item}
                    </td>
                ))}
                <td className="table__total">Total of totals</td>
            </tr>
            </tfoot>
        </table>
    );
};

export default Table;