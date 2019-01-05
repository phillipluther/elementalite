// export {default as Tabs} from './Tabs';
// export {default as Tab} from './Tab';
// export {default as Panel} from './Panel';

import Tabs from './Tabs';
import Tab from './Tab';
import Panel from './Panel';

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
