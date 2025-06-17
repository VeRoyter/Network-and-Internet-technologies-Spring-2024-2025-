import { useState, useEffect } from 'react';

const SortControls = ({ onSortChange, fields }) => {
    const [sortLevels, setSortLevels] = useState([
        { column: '', order: false },
        { column: '', order: false },
        { column: '', order: false },
    ]);

    const [availableFields, setAvailableFields] = useState([
        fields,
        fields,
        fields,
    ]);

    const [isLevelEnabled, setIsLevelEnabled] = useState([
        true,
        false,
        false,
    ]);

    const handleColumnChange = (level, value) => {
        const newSortLevels = [...sortLevels];
        newSortLevels[level].column = value;
        setSortLevels(newSortLevels);

        // Обновляем доступные поля
        updateAvailableFields(newSortLevels);

        // Разблокируем следующий уровень, если выбрано поле
        if (level < 2 && value !== '') {
            const newIsLevelEnabled = [...isLevelEnabled];
            newIsLevelEnabled[level + 1] = true;
            setIsLevelEnabled(newIsLevelEnabled);
        }

        // Сбрасываем последующие уровни, если выбрано "Нет"
        if (value === '') {
            resetSubsequentLevels(level);
        }

        const activeSorts = newSortLevels.filter((lvl) => lvl.column !== '');
        onSortChange(activeSorts);
    };

    const handleOrderChange = (level, checked) => {
        const newSortLevels = [...sortLevels];
        newSortLevels[level].order = checked;
        setSortLevels(newSortLevels);
        const activeSorts = newSortLevels.filter((lvl) => lvl.column !== '');
        onSortChange(activeSorts);
    };

    const resetSort = () => {
        const resetLevels = sortLevels.map(() => ({ column: '', order: false }));
        setSortLevels(resetLevels);
        setAvailableFields([fields, fields, fields]);
        setIsLevelEnabled([true, false, false]);
        onSortChange([]);
    };

    // const updateAvailableFields = (currentSortLevels = sortLevels) => {
    //     const selectedColumns = currentSortLevels
    //         .map((lvl) => lvl.column)
    //         .filter((col) => col !== '');

    //     const newAvailableFields = [];
    //     for (let i = 0; i < 3; i++) {
    //         const previouslySelected = selectedColumns.slice(0, i);
    //         const available = fields.filter((field) => !previouslySelected.includes(field));
    //         newAvailableFields[i] = available;
    //     }
    //     setAvailableFields(newAvailableFields);
    // };

    const updateAvailableFields = (currentSortLevels = sortLevels) => {
        const selectedColumns = currentSortLevels
            .map((lvl) => lvl.column)
            .filter((col) => col !== '');

        const newAvailableFields = [];
        for (let i = 0; i < 3; i++) {
            // Исключаем все поля, выбранные на предыдущих уровнях до i
            const previouslySelected = selectedColumns.slice(0, i);
            const available = fields.filter((field) => !previouslySelected.includes(field));
            newAvailableFields[i] = available;
        }
        setAvailableFields(newAvailableFields);
    };

    const resetSubsequentLevels = (level) => {
        const newSortLevels = [...sortLevels];
        const newIsLevelEnabled = [...isLevelEnabled];

        for (let i = level + 1; i < 3; i++) {
            newSortLevels[i] = { column: '', order: false };
            newIsLevelEnabled[i] = false;
        }

        setSortLevels(newSortLevels);
        setIsLevelEnabled(newIsLevelEnabled);
        updateAvailableFields(newSortLevels);
    };

    useEffect(() => {
        setAvailableFields([fields, fields, fields]);
    }, [fields]);

    useEffect(() => {
        updateAvailableFields(sortLevels);
    }, [sortLevels, fields]);
    
    return (
        <div className="sort-controls">
            <h4>Сортировка</h4>
            {sortLevels.map((level, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <select
                        value={level.column}
                        onChange={(e) => handleColumnChange(index, e.target.value)}
                        disabled={!isLevelEnabled[index]}
                    >
                        <option value="">Нет</option>
                        {availableFields[index].map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                    <label style={{ marginLeft: '10px' }}>
                        По убыванию
                        <input
                            type="checkbox"
                            checked={level.order}
                            onChange={(e) => handleOrderChange(index, e.target.checked)}
                            disabled={level.column === '' || !isLevelEnabled[index]}
                        />
                    </label>
                </div>
            ))}
            <button onClick={resetSort}>Сбросить сортировку</button>
        </div>
    );
};

export default SortControls;