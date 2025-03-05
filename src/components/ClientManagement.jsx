import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');

  const addClient = () => {
    if (name && phone && service) {
      const newClient = { 
        id: Date.now(), 
        name, 
        phone, 
        service, 
        timestamp: new Date().toLocaleString() // Almacena la fecha como un string legible
      };
      setClients((prevClients) => [...prevClients, newClient]);
      setName('');
      setPhone('');
      setService('');
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const removeClient = (id) => {
    setClients((prevClients) => prevClients.filter(client => client.id !== id));
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Input 
          placeholder="Nombre" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <Input 
          placeholder="Teléfono" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <Input 
          placeholder="Servicio" 
          value={service} 
          onChange={(e) => setService(e.target.value)} 
        />
        <Button onClick={addClient}>Agregar Cliente</Button>
      </div>
      <div className="grid gap-4">
        {clients.map(client => (
          <Card key={client.id}>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <p><strong>Nombre:</strong> {client.name}</p>
                  <p><strong>Teléfono:</strong> {client.phone}</p>
                  <p><strong>Servicio:</strong> {client.service}</p>
                  <p><strong>Hora:</strong> {client.timestamp}</p>
                </div>
                <Button onClick={() => removeClient(client.id)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientManagement;