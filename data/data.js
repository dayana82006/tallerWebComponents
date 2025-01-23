export function getData(){

    return new Promise((resolve) =>
    {
        let dataFactura = [
            {
                nroFact: {
                    header: {
                        nroId: '',
                        nombres: '',
                        apellidos: '',
                        direccion: '',
                        email: '',
                    },
                    detailFact: [
                        {
                            code : '',
                            nombreP : '',
                            valorUnit : '',
                            cantidad : '',
                            subtotal:'',
                        }
                    ],
                    sumary:{
                        subtotal : '',
                        iva : '',
                        total : '',
                    }
                }
            }
        ];
        setTimeout(() => resolve(dataFactura),300)
    });
}
