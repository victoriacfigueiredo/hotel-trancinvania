import apiService from "../../../shared/services/api-service";

//get

export async function getPayMethodsByClient(clientId: number){
    const response = await apiService.get(`/client/${clientId}/paymentMethods`);
    console.log(response)
    return response.data;
}

export async function deletePayMethodsById(clientId: number, payMentMethodId: number){
    const response = await apiService.delete(`/client/${clientId}/paymentMethods/${payMentMethodId}`);
    console.log(response)
    return response.data;
}


// export async function getReservationById(reservationId: number){
//     const response = await apiService.get(`/reserve/${reservationId}`);
//     return response.data;
// }

// //post

export async function postPayMethods(name: string, numCard: string, cvv: number, expiryDate: string, type: string, clientId: number, cpf: string) {
    const response = await apiService.post(`/client/${clientId}/paymentMethods`, {
        name,
        numCard,
        cvv,
        expiryDate,
        type,
        clientId, // Este parâmetro pode ser redundante, pois já está na URL
        cpf
    });
    return response.data;
}

// Função para atualizar um método de pagamento existente
export async function editPayMethods(paymentMethodId: number, name: string, numCard: string, cvv: number, expiryDate: string, type: string, clientId: number, cpf: string) {
    const response = await apiService.patch(`/client/${clientId}/paymentMethods/${paymentMethodId}`, {
        name,
        numCard,
        cvv,
        expiryDate,
        type,
        clientId, // Este parâmetro pode ser redundante, pois já está na URL
        cpf
    });
    return response.data;
}
// //put

// export async function updateReservation(clientId: number, publishedReservationId: number, reservationId: number, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string){
//     const response = await apiService.put(`/client/${clientId}/publishedReservation/${publishedReservationId}/reserve/${reservationId}`, {num_rooms: num_rooms, checkin: checkin, checkout: checkout, num_adults: num_adults, num_children: num_children, paymentMethodName: paymentMethodName});
//     return response.data;
// }

// //delete 

// export async function cancelReservation(reservationId: number){
//     const response = await apiService.delete(`/reserve/${reservationId}`);
//     return response.data;
// }





