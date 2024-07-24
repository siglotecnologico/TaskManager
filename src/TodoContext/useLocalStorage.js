import React from 'react'

function useLocalStorage(itemName, inictiaValue) {

    const [item, setItem] = React.useState(inictiaValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);


    React.useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);// consultamos el local storage  
                let parsedItem;
                if (!localStorageItem) {
                    localStorage.setItem(itemName, JSON.stringify(inictiaValue));
                    parsedItem = inictiaValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem); // convertimos el string a un objeto para utilizarlo en la aplicacion
                    setItem(parsedItem)
                }
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                setError(true);
            }

        }, 2000)
    }, []);


    // actualizar el estado con persitencias
    const saveItem = (newItem) => {
        setItem(newItem);
        localStorage.setItem(itemName, JSON.stringify(newItem))
    };
    return {
        item, 
        saveItem, 
        loading, 
        error
    }

}
export { useLocalStorage }