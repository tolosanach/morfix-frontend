import { useQuery } from "react-query";
import MainApi from "../../../api/MainApi";
import { onErrorResponse } from "@/components/ErrorResponse";
import { getToken } from "@/components/checkout-page/functions/getGuestUserId";

export default function useGetAllCartList(guestId, cartListSuccessHandler) {

  const getData = async () => {
    const token = getToken()
    try {
      const params = !token ? `?guest_id=${guestId}` : "";
      const { data } = await MainApi.get(`api/v1/customer/cart/list${params}`);
      return data;
    } catch (error) {
      throw error; // Rethrow the error to be caught by React Query
    }
  };

  return useQuery("cart-item", getData, {
    onSuccess: cartListSuccessHandler,
    enabled: typeof guestId !== 'undefined', // Enable the query only when guestId is defined
    onError: onErrorResponse,
  });
}
