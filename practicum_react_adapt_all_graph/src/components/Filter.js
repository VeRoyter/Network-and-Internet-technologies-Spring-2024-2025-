const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            "Название города": event.target["name"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
        };

        const rangeFilters = {
            "Население": {
                min: event.target["populationFrom"].value
                    ? parseInt(event.target["populationFrom"].value)
                    : null,
                max: event.target["populationTo"].value
                    ? parseInt(event.target["populationTo"].value)
                    : null,
            },
            "Средний заработок": {
                min: event.target["earningsFrom"].value
                    ? parseInt(event.target["earningsFrom"].value)
                    : null,
                max: event.target["earningsTo"].value
                    ? parseInt(event.target["earningsTo"].value)
                    : null,
            },
            "Средняя цена квартиры": {
                min: event.target["apartmentFrom"].value
                    ? parseInt(event.target["apartmentFrom"].value)
                    : null,
                max: event.target["apartmentTo"].value
                    ? parseInt(event.target["apartmentTo"].value)
                    : null,
            },
            "Размер города (км²)": {
                min: event.target["sizeFrom"].value
                    ? parseFloat(event.target["sizeFrom"].value)
                    : null,
                max: event.target["sizeTo"].value
                    ? parseFloat(event.target["sizeTo"].value)
                    : null,
            },
        };

        let arr = props.fullData;

        // Текстовые фильтры (город и страна)
        for (const key in filterField) {
            if (filterField[key]) {
                arr = arr.filter((item) =>
                    item[key].toLowerCase().includes(filterField[key])
                );
            }
        }

        // Числовые фильтры (диапазоны)
        for (const key in rangeFilters) {
            const { min, max } = rangeFilters[key];
            if (min !== null) {
                arr = arr.filter((item) => item[key] >= min);
            }
            if (max !== null) {
                arr = arr.filter((item) => item[key] <= max);
            }
        }

        props.filtering(arr);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Название города:</label>
                <input name="name" type="text" />
            </p>
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
            <p>
                <label>Население от:</label>
                <input name="populationFrom" type="number" min="0" />
                <label>до:</label>
                <input name="populationTo" type="number" min="0" />
            </p>
            <p>
                <label>Заработок от:</label>
                <input name="earningsFrom" type="number" min="0" />
                <label>до:</label>
                <input name="earningsTo" type="number" min="0" />
            </p>
            <p>
                <label>Цена квартиры от:</label>
                <input name="apartmentFrom" type="number" min="0" />
                <label>до:</label>
                <input name="apartmentTo" type="number" min="0" />
            </p>
            <p>
                <label>Размер города (км²) от:</label>
                <input name="sizeFrom" type="number" step="0.1" min="0" />
                <label>до:</label>
                <input name="sizeTo" type="number" step="0.1" min="0" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button
                    type="reset"
                    onClick={() => props.filtering(props.fullData)}
                >
                    Сбросить фильтр
                </button>
            </p>
        </form>
    );
};

export default Filter;