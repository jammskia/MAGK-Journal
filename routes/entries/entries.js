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
            return res.status(500).json({ error: e });
        }    
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            let entryId = req.params.id;
            entryId = validation.checkId(entryId);

            const singleEntry = await entryData.getEntryById(entryId);
            if (!singleEntry) {
                return res.status(404).json({ error: `Entry [${entryId}] not found` });
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
            return res.status(500).json({ error: e });
        }
    });
    
export default router;
