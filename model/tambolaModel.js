import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({

    
      ticket:[[Number]],




},

);
export default mongoose.model('Ticket',ticketSchema);

