import { Router } from 'express';
import { entryData, activityData, socialData, emotionData, energyData, userData } from '../../data/dataIndex.js';

import validation from '../../misc/commonValidations.js';
import { routeHelpers } from "../commonRoutes.js";

const router = Router();

router.route('/')
    .get(async (req, res) => {
        try {
            //// Testing Only /////
            let allUsers = await userData.getAllUsers();
            let userId = allUsers[0]._id.toString()
            //// Testing Only /////

            const entryList = await entryData.getUserEntries(userId);

            entryList.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            // this passes an emotionName to the object for the colour-coded card functionality
            for (let entry of entryList) {
                try {
                    const emotion = await emotionData.getEmotionById(entry.emotionId);
                    entry.emotionName = emotion.name;
                } catch (e) {
                    console.log(`Could not fetch emotion for entry ${entry._id}:`, e);

                    // incase it does not get an emotion for some reason
                    entry.emotionName = 'Unknown';
                }
            }

            return res.render("entries/entriesAll", {
                showNav: true,
                pageTitle: "Entries",
                entries: entryList,
                randomizedHeadings: routeHelpers.randomizeHeadings()
            });

        } catch (e) {
            console.log('Error fetching all entries:', e);
            return res.status(500).render('errorPage', {
                status: '500',
                error: 'Failed to fetch all entries.'
            });
        }
    })
    .post(async (req, res) => {
        try {
            let { userId, title, emotionId, energyId, activities, socials, notes } = req.body;

            // makes sure that activites and socials are sent, even if not selected
            if (!Array.isArray(activities)) {
                // if only one is sent, wrap it around since it would be a string
                if (activities) {
                    activities = [activities];
                    // if nothing is selected, make sure it is still an empty array, since it would be undefined
                } else {
                    activities = []
                }
            }
            if (!Array.isArray(socials)) {
                if (socials) {
                    socials = [socials];
                } else {
                    socials = []
                }
            }

            //// Testing Only /////
            let allUsers = await userData.getAllUsers();
            userId = allUsers[0]._id.toString()
            //// Testing Only /////

            console.log('Received data:', req.body);
            validation.checkId(userId, "userId");

            if (title) {
                validation.checkString(title, "title", 0);
            } else {
                title = 'Untitled';
            }

            validation.checkId(emotionId, "emotionId");
            validation.checkId(energyId, "energyId");
            for (let i = 0; i < activities.length; i++) {
                validation.checkId(activities[i], "activityId");
            }
            for (let i = 0; i < socials.length; i++) {
                validation.checkId(socials[i], "socialId");
            }
            validation.checkString(notes, "notes", 0);

            const newEntry = await entryData.createEntry(
                userId,
                new Date(),
                title,
                emotionId,
                energyId,
                activities,
                socials,
                notes
            );
            return res.redirect(`/entries/${newEntry._id}`);

        } catch (e) {
            console.log('Failed to create entry:', e);
            return res.status(400).render('errorPage', {
                status: '400',
                error: 'Failed to create entry.'
            });

        }
    });


router.route('/new')
    .get(async (req, res) => {
        try {
            const emotions = await emotionData.getAllEmotions();
            const energies = await energyData.getAllEnergies();
            // const activities = await activityData.getAllActivities();
            const categorizedActivities = await activityData.getActivitiesByCategory();
            const socials = await socialData.getAllSocials();

            res.render('entries/entriesNew', {
                pageTitle: 'Create New Entry',
                hideEntryButton: true,
                emotions,
                energies,
                activities: categorizedActivities,
                socials,
                randomizedHeadings: routeHelpers.randomizeHeadings()
            });
        } catch (e) {
            console.log('Error displaying new entry form:', e);
            res.status(500).render('errorPage', {
                status: '500',
                error: 'Failed to load new entry form.'
            });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            let entryId = req.params.id;
            entryId = validation.checkId(entryId);

            const singleEntry = await entryData.getEntryById(entryId);
            if (!singleEntry) {
                return res.status(404).render('errorPage', {
                    status: '404',
                    error: `Entry [${entryId}] not found`
                });
            }

            // get the traits
            const emotion = await emotionData.getEmotionById(singleEntry.emotionId);
            const energy = await energyData.getEnergyById(singleEntry.energyId);
            const defaultEnergies = await energyData.getAllEnergies();
            const activities = [];
            for (let i = 0; i < singleEntry.activities.length; i++) {
                activities.push(await activityData.getActivityById(singleEntry.activities[i].toString()));
            }
            const socials = [];
            for (let i = 0; i < singleEntry.socials.length; i++) {
                socials.push(await socialData.getSocialById(singleEntry.socials[i]));
            }
            return res.render('entries/entriesSingle', {
                pageTitle: "Entry",
                entry: singleEntry,
                emotion,
                energy,
                defaultEnergies,
                activities,
                socials
            });

        } catch (e) {
            console.log('Error fetching entry:', e);
            return res.status(500).render('errorPage', {
                status: '500',
                error: 'Error fetching entry.'
            });
        }
    });

router.route('/:id/edit')
    .get(async (req, res) => {
        try {
            const entryId = req.params.id;
            const singleEntry = await entryData.getEntryById(entryId);

            if (!singleEntry) {
                return res.status(404).render('errorPage', {
                    status: '404',
                    error: 'Entry not found'
                });
            }

            const emotions = await emotionData.getAllEmotions();
            const energies = await energyData.getAllEnergies();
            // const activities = await activityData.getAllActivities();
            const categorizedActivities = await activityData.getActivitiesByCategory();
            const socials = await socialData.getAllSocials();

            res.render('entries/entriesEdit', {
                pageTitle: 'Edit Entry',
                entry: singleEntry,
                emotions,
                energies,
                activities: categorizedActivities,
                socials,
                randomizedHeadings: routeHelpers.randomizeHeadings()
            });
        } catch (e) {
            console.log('Error displaying entry edit form:', e);
            res.status(500).render('errorPage', {
                status: '500',
                error: 'Failed to load edit entry form.'
            });
        }
    })
    .post(async (req, res) => {
        const entryId = req.params.id;
        let { userId, title, emotionId, energyId, activities, socials, notes } = req.body;

        //// Testing Only /////
        let allUsers = await userData.getAllUsers();
        userId = allUsers[0]._id.toString()
        //// Testing Only /////

        if (!Array.isArray(activities)) {
            if (activities) {
                activities = [activities];
            } else {
                activities = []
            }
        }
        if (!Array.isArray(socials)) {
            if (socials) {
                socials = [socials];
            } else {
                socials = []
            }
        }

        if (title) {
            validation.checkString(title, "title", 0);
        } else {
            title = 'Untitled';
        }

        if (!notes) {
            notes = 'No notes provided...';
        }

        try {
            const updateObject = {
                title,
                emotionId,
                energyId,
                activities,
                socials,
                notes
            };

            const updatedEntry = await entryData.updateEntry(userId, entryId, updateObject);
            return res.redirect(`/entries/${updatedEntry._id}`);
        } catch (e) {
            console.log('Failed to update entry:', e);
            res.status(400).render('errorPage', {
                status: '400',
                error: 'Failed to update entry.'
            })
        }
    });

router.route('/:id/delete')
    .post(async (req, res) => {
        const entryId = req.params.id;
        let userId = req.body.userId;

        //// Testing Only /////
        let allUsers = await userData.getAllUsers();
        userId = allUsers[0]._id.toString()
        //// Testing Only /////

        try {
            await entryData.deleteEntry(userId, entryId);
            return res.redirect('/entries');
        } catch (e) {
            console.log('Failed to delete entry:', e);
            res.status(400).render('errorPage', {
                status: '400',
                error: 'Failed to delete entry.'
            });
        }
    });

export default router;
