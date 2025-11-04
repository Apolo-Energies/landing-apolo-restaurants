export const Block2Component = () => {
    return (
        <div className="bg-gradient-to-b from-[#15268D] py-4 to-[#2541E9] text-white">
            <div className="container mx-auto px-4 py-10">
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Texto principal y cards */}
                    <div className="flex flex-col h-full gap-6">
                        <div>
                            <h3 className="text-4xl font-bold mb-4 leading-tight">
                                El control de tu factura en la <br />palma de tu mano.
                            </h3>
                            <p className="text-2xl mb-6">
                                Con nuestra herramienta de control, dispondrás de:
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 flex-1">
                            <div className="bg-white text-blue-900 rounded-[9999px] p-8 flex items-center justify-center text-center h-full">
                                <p className="font-bold text-4xl leading-tight max-w-[10ch] whitespace-normal">
                                    Mapa de <br className="hidden sm:block" /> calor
                                </p>
                            </div>

                            <div className="bg-white text-blue-900 rounded-[9999px] p-8 flex items-center justify-center text-center h-full">
                                <p className="font-bold text-4xl leading-tight max-w-[14ch] whitespace-normal">
                                    Estimaciones de costes
                                </p>
                            </div>
                            <div className="bg-white text-blue-900 rounded-[9999px] p-8 flex items-center justify-center text-center h-full">
                                <p className="font-bold text-3xl leading-tight max-w-[16ch] whitespace-normal">
                                    Optimizador de potencia y contrato
                                </p>
                            </div>
                            <div className="bg-white text-blue-900 rounded-[9999px] p-8 flex items-center justify-center text-center h-full">
                                <p className="font-bold text-4xl leading-tight max-w-[14ch] whitespace-normal">
                                    Informe de factura
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="flex items-stretch justify-end rounded-3xl overflow-hidden max-h-[550px]">
                        <img
                            src="/imgs/block2.webp"
                            alt="App Screenshot"
                            className="h-full w-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
