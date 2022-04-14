import React, { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { Menu, Layout, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu } = Menu;
const { Sider } = Layout;
function SideBar() {
  const calendars = useSelector((state) => state.calendars.data);
  const {
    selectedCalendars,
    addToSelectedCalendars: setSelectedCalendars
  } = useState([]);
  const renderedCalendars = calendars.map((calendar) => (
    <Menu.Item key={calendar.id}>
      <Checkbox
        checked={selectedCalendars && selectedCalendars.includes(calendar)}
        onChange={(e) => onCalendarSelected(e.target.checked, calendar)}
      >
        {calendar.id}
      </Checkbox>
    </Menu.Item>
  ));

  function onCalendarSelected(checked, calendar) {
    if (checked && !selectedCalendars.includes(calendar)) {
      setSelectedCalendars([...selectedCalendars, calendar]);
    } else {
      setSelectedCalendars(
        selectedCalendars.filter((c) => c.id !== calendar.id)
      );
    }
  }

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultOpenKeys={["sub-menu-calendars"]}
        style={{ height: "100%" }}
      >
        <SubMenu
          key="sub-menu-calendars"
          icon={<CalendarOutlined />}
          title="Calendars"
        >
          {renderedCalendars}
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default SideBar;
