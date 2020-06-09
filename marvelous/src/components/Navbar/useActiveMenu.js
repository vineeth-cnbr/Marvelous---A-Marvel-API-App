import { useState } from 'react';

export default (defaultMenu) => {

    const [activeMenu, setActiveMenu] = useState(defaultMenu)

    const isActiveMenu = (menu) => {
        if (menu === activeMenu) {
            return 'active';
        }
        return '';
    }

    return [activeMenu, setActiveMenu, isActiveMenu];

}