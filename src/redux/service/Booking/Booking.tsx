import {
  AddBookingReq,
  AddBookingRes,
  DeleteBookingReq,
  DeleteBookingRes,
  EditBookingReq,
  EditBookingRes,
  GetBookingReq,
  BookingRes,
} from "../../types/Booking/booking";
import { httpService } from "../httpService";
import url from "./url";

const BookingApi = {
  getBookings: (params: GetBookingReq) => {
    const merchant = JSON.parse(localStorage.getItem("merchant") as any);
    const uri = url.bookingList(merchant.id);
    return httpService.GET<GetBookingReq, BookingRes[]>({
      uri,
      params,
    });
  },

  addBooking: (request: AddBookingReq) => {
    const uri = url.bookingPatch;
    return httpService.POST<AddBookingReq, AddBookingRes>({
      uri,
      request,
    });
  },

  editBooking: (request: EditBookingReq, id: string) => {
    const uri = url.bookingPatch + `/${id}/`;
    return httpService.PATCH<EditBookingReq, EditBookingRes>({
      uri,
      request,
    });
  },

  deleteBooking: ({ id }: DeleteBookingReq) => {
    const uri = url.bookingPatch + `/${id}/`;
    return httpService.DELETE<DeleteBookingReq, DeleteBookingRes>({
      uri,
    });
  },
};

export default BookingApi;
