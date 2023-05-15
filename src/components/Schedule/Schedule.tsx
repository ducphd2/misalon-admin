import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getBookings,
  selectBookingList,
} from "../../redux/slice/Booking/BookingSlice";
import { useEffect, useMemo } from "react";
import { BookingRes } from "../../redux/types/Booking/booking";

const events = [{ title: "Meeting", start: new Date() }];

const Calender = () => {
  const dispatch = useAppDispatch();
  const selectBookings = useAppSelector(selectBookingList);
  const bookingCalender = useMemo(() => {
    return selectBookings.map((i: BookingRes) => {
      return {
        title: `${i.startTime}- ${i.endTime}`,
        start: new Date(i.bookingDate as any),
      };
    });
  }, [selectBookings]);

  useEffect(() => {
    dispatch(
      getBookings({
        page: 1,
        limit: 30,
        sortBy: "name",
        sortOrder: "ASC",
      })
    );
  }, []);
  console.log({ selectBookings });
  console.log({ bookingCalender });
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={bookingCalender as any}
      eventContent={renderEventContent}
    />
  );
};
// a custom render function
function renderEventContent(eventInfo: any) {
  return (
    <div style={{backgroundColor:"#ccc", padding:10, margin:'auto'}}>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
    </div>
  );
}

export default Calender;
