import { Router } from 'express';
import { entryData, activityData, socialData, emotionData, energyData } from '../../data/dataIndex.js';
import validation from '../../misc/commonValidations.js';
const router = Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const entryList = await entryData.getAllEntries();
            return res.render("entries/entriesAll", { entries: entryList });
            
        } catch (e) {
            console.log('Error fetching all entries:', e);
            return res.status(500).render('errorPage', { 
                status: '500',
                error : 'Failed to fetch all entries.'
            });
        }    
    })
    .post(async (req, res) => {
        try {
            let { userId, emotionId, energyId, activities, socials, notes } = req.body;

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

            console.log('Received data:', req.body);

            validation.checkId(userId, "userId");
            validation.checkId(emotionId, "emotionId");
            validation.checkId(energyId, "energyId");
            for (let i = 0; i < activities.length; i++) {
                validation.checkId(activities[i], "activityId");
            }
            for (let i = 0; i < socials.length; i++) {
                validation.checkId(socials[i], "socialId");
            }
            validation.checkString(notes, "notes", 0)

            const newEntry = await entryData.createEntry(
                userId,
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
            const activities = await activityData.getAllActivities();
            const socials = await socialData.getAllSocials();

            res.render('entries/entriesNew', {
                title: 'Create New Entry',
                emotions,
                energies,
                activities,
                socials
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
            const activities = [];
            for (let i = 0; i < singleEntry.activities.length; i++) {
                activities.push(await activityData.getActivityById(singleEntry.activities[i].toString()));
            }
            const socials = [];
            for (let i = 0; i < singleEntry.socials.length; i++) {
                socials.push(await socialData.getSocialById(singleEntry.socials[i]));
            }

            return res.render('entries/entriesSingle', { 
                entry: singleEntry,
                emotion: emotion,
                energy: energy,
                activities: activities,
                socials: socials
            });

        } catch (e) {
            console.log('Error fetching entry:', e);
            return res.status(500).render('errorPage', { 
                status: '500',
                error: 'Error fetching entry.' 
            });
        }
    });
    
export default router;
