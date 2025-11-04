
export const Block3Component = () => {
    const tarifas = [
        {
            title: 'Tarifa estable',
            description: 'Todos los períodos al mismo precio'
        },
        {
            title: 'Tarifa fácil',
            description: 'Precio escalonado para beneficiar tu P6'
        },
        {
            title: 'Tarifa DYN',
            description: 'Tarifa con precio fijo de P1 a P5 y P6 Bonificada'
        },
        {
            title: 'Tarifa Indexada',
            description: 'Precios de mercado'
        }
    ];
    
    return (
        <div className="container mx-auto px-4 pt-14 pb-20">
            <h3 className="text-3xl font-bold mb-2">
                Descubre nuestras <span className="text-blue-900">tarifas</span>
            </h3>
            <p className="text-2xl mb-8">Tarifas pensadas para el ritmo de la hostelería.</p>
            <div className="grid md:grid-cols-4 gap-6">
                {tarifas.map((tarifa, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
                        <h4 className="text-2xl font-bold text-blue-900 mb-4">{tarifa.title}</h4>
                        <p className="text-2xl text-gray-700">{tarifa.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};