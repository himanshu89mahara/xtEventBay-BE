import { dateIsLessThan, formattedErros } from "../utils/mongoose";
import EventModel, { eventSchema } from "./event.model";

export const listEvent = (req, res) => {
  res.send("Event list");
};
export const updateEvent = async(req, res) => {
  try{
    const event = await EventModel.findByIdAndUpdate(req.params.eventID,req.body,{runValidators:true,new:true});
    if(event){
      res.json({
        status: true,
        event,
      });
    }else{
      throw new Error('Event not found');
    }

  }catch(err){
    const errors = formattedErros(err);
    res.json({
      status: false,
      message: (typeof(errors)==='object' && Object.keys(errors).length > 0)?'Please check all form fields':err.message,
      errors
    });
  }
};
export const addEvent = async (req, res) => {
  try {
    const event = new EventModel(req.body);
    await event.save();

    res.json({
      status: true,
      event,
    });
  } catch (err) {
    const errors = formattedErros(err);
    res.json({
      status: false,
      message: (typeof(errors)==='object' && Object.keys(errors).length > 0)?'Please check all form fields':err.message,
      errors
    });
  }
};
export const deleteEvent = async(req, res) => {
  try{
    const event = await EventModel.findByIdAndDelete(req.params.eventID);
    if(event){
      res.json({
        status: true,
        event,
      });
    }else{
      throw new Error('Event not found');
    }

  }catch(err){
    
    res.json({
      status: false,
      message: err.message
    });
  }
};
export const getEvent = async(req, res) => {
  try{
    const event = await EventModel.findById(req.params.eventID);
    if(event){
      res.json({
        status: true,
        event,
      });
    }else{
      throw new Error('Event not found');
    }

  }catch(err){
    const errors = formattedErros(err);
    res.json({
      status: false,
      message: (typeof(errors)==='object' && Object.keys(errors).length > 0)?'Please check all form fields':err.message,
      errors
    });
  }
};
export const approveEvent = async(req, res) => {
  try{
    const event = await EventModel.findByIdAndUpdate(req.params.eventID,{isApproved:true},{new:true});
    if(event){
      res.json({
        status: true,
        event,
      });
    }else{
      throw new Error('Event not found');
    }

  }catch(err){
    const errors = formattedErros(err);
    res.json({
      status: false,
      message: (typeof(errors)==='object' && Object.keys(errors).length > 0)?'Please check all form fields':err.message,
      errors
    });
  }
};

export const statusChangeEvent = async(req, res) => {
  try{
    let status = null;
    switch(req.params.status.toLowerCase()){
      case 'reject':
        status = 'Rejected';
        break;
      case 'cancel':
        status = 'Cancelled';
        break;

    }
    
    const event = await EventModel.findById(req.params.eventID);
    
    if(event){
      event.status = status;
      event.comment  =req.body.comment
      await EventModel.updateOne({_id:req.params.eventID},event,{runValidators:true});
      res.json({
        status: true,
        event,
      });
    }else{
      throw new Error('Event not found');
    }

  }catch(err){
    const errors = formattedErros(err);
    res.json({
      status: false,
      message: (typeof(errors)==='object' && Object.keys(errors).length > 0)?'Please check all form fields':err.message,
      errors
    });
  }
};
export const addInterestedUserInEvent = (req, res) => {
  res.send(`Event add Interested User Action ${req.body.user}`);
};
