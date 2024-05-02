import { Router } from 'express';
import { entryData, userData } from '../../data/dataIndex.js';

import validation from '../../misc/commonValidations.js';
import { routeHelpers } from "../commonRoutes.js";

const router = Router();

router.route('/')
    .get(async (req, res) => {
        try {
            return res.render("moodMeter/moodMeter", {
                pageTitle: "Mood Meter",
                jsURLs: ['public/js/mood_meter.js', `https://cdn.jsdelivr.net/npm/chart.js`],
                randomizedHeadings: routeHelpers.randomizeHeadings()
            });

        } catch (e) {
            console.log('Error fetching Mood Meter:', e);
            return res.status(500).render('errorPage', {
                status: '500',
                error: 'Failed to Mood Meter data.'
            });
        }
    });

router.route('/data')
    .get(async (req, res) => {
        try {
            let startDate = req.query.startDate;
            let endDate = req.query.endDate;

            //// Testing Only /////
            let allUsers = await userData.getAllUsers();
            let userId = allUsers[0]._id.toString()
            //// Testing Only /////

            validation.checkId(userId, "userId");

            if (startDate && endDate) {
                const moodMeterData = await entryData.getMoodMeterDataForDateRange(userId, startDate, endDate);

                if (!moodMeterData) {
                    return res.status(404).render('errorPage', {
                        status: '500',
                        error: `Error Loading Mood Meter Data.`
                    });
                }
                return res.json(moodMeterData);
            } else {
                const moodMeterData = await entryData.getDefaultMoodMeterData(userId);
                if (!moodMeterData) {
                    return res.status(404).render('errorPage', {
                        status: '500',
                        error: `Error Loading Mood Meter Data.`
                    });
                }
                return res.json(moodMeterData);
            }
        } catch (e) {
            console.log('Error fetching Mood Meter Data:', e);
            return res.status(500).render('errorPage', {
                status: '500',
                error: 'Failed to Mood Meter data.'
            });
        }
    });

export default router;