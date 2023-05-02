const express = require('express');
const mongoose = require('mongoose')
const Event = require('../model/event');
const upload = require('../middleware/upload');

const router = express.Router();


// GET /api/v3/app/events?id=:event_id
router.get('/events', (req, res) => {
    const eventId = req.query.id;
    // implement logic to get event by id
    Event.findById(eventId)
      .then(result => {
        res.status(200).json({
          eventData: result
        });
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  });
  
  // GET /api/v3/app/events?type=latest&limit=5&page=1
  router.get('/events?type=latest&limit=5&page=1', (req, res) => {
    const type = req.query.type;
    const limit = req.query.limit;
    const page = req.query.page;
    const offset = (page - 1) * limit;
    // implement logic to get latest events with pagination
    Event.find({ type: type })
      .sort({ schedule: 'desc' })
      .skip(offset)
      .limit(parseInt(limit)).then(events => {
        res.json(events);
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      })
    // res.send(`Latest events with type ${type}, limit ${limit}, and page ${page}`);
  });
  
  // POST /api/v3/app/events
  router.post('/events', upload.single('files'), (req, res) => {
    // const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, files } = req.body;
    // implement logic to create event
    const event = new Event({
      _id: new mongoose.Types.ObjectId,
      uid: req.body.uid,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: req.body.schedule,
      description: req.body.description,
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
      attendees: req.body.attendees
    })
    if (req.file) {
      event.files = req.file.path
    }
    event.save()
      .then(result => {
        console.log(result);
        res.send("Event created successfully.")
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      })
    // res.send('Event created successfully');
  });
  
  // PUT /api/v3/app/events/:id
  router.put('/events/:id', upload.single('files'), (req, res) => {
    const eventId = req.params.id;
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, files } = req.body;
    // implement logic to update event by id
    Event.findOneAndUpdate({ eventId }, {
      $set: {
        uid: req.body.uid,
        name: req.body.name,
        tagline: req.body.tagline,
        schedule: req.body.schedule,
        description: req.body.description,
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: req.body.rigor_rank,
        attendees: req.body.attendees
      }
    })
      .then(result => {
        res.send(`Event with id ${eventId} updated successfully`);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  
  });
  
  // DELETE /api/v3/app/events/:id
  router.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
    // implement logic to delete event by id
    Event.findByIdAndDelete(eventId);
    res.send(`Event with id ${eventId} deleted successfully`);
  });

  module.exports = router;
  