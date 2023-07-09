import Ticket from "../model/tambolaModel.js";
import { v4 as uuidv4 } from 'uuid';

export const createTicketController = async (req, res) => {
  const numTickets = req.body.numTickets || 1;
  const generatedTickets = [];

  for (let i = 0; i < numTickets; i++) {

    let ticketId = uuidv4();
    let ticket = generateTicket();

    while (await Ticket.exists({ ticket: ticket })) {
      ticketId = uuidv4();
      ticket = generateTicket();
    }
   

    const newTicket = new Ticket({
      id: ticketId,
      ticket: ticket,
    });

    
    await newTicket.save();

    const ticketKey = `ticket${i}`;
    

    generatedTickets[ticketKey] = {ticket: ticket };


    generatedTickets.push({ id: ticketId, ticket: ticket });
  }

  res.json({ tickets: generatedTickets });
};
function generateTicket() {
    const ticket = [];
  
    // Generate an array with numbers 1 to 90
    const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  
    // Shuffle the numbers array randomly
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    // Generate the ticket rows
    for (let i = 0; i < 3; i++) {
      const row = [];
      const nonZeroValues = [];
  
      // Fill row with numbers
      while (nonZeroValues.length < 5 && numbers.length > 0) {
        const num = numbers.pop();
        nonZeroValues.push(num);
      }
  
      // Randomize positions of non-zero values
      for (let j = nonZeroValues.length - 1; j > 0; j--) {
        const randomIndex = Math.floor(Math.random() * (j + 1));
        [nonZeroValues[j], nonZeroValues[randomIndex]] = [nonZeroValues[randomIndex], nonZeroValues[j]];
      }
  
      // Fill remaining spaces with zeros
      const zerosCount = 9 - nonZeroValues.length;
      for (let j = 0; j < zerosCount; j++) {
        nonZeroValues.splice(Math.floor(Math.random() * (nonZeroValues.length + 1)), 0, 0);
      }
  
      ticket.push(nonZeroValues);
    }
  
    return ticket;
  }
  
  


export const getAllTicketController = async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({
      success: true,
      tickets: tickets,
      totalTickets: tickets.length
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};

    
  
 
