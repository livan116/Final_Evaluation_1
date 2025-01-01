const Folder = require("../models/Folder");
const FormBot = require("../models/FormBot"); // Import FormBot model
const ShareableLink = require("../models/Share");
const { uuid } = require('uuidv4');

exports.createFolder = async (req, res) => {
  try {
    console.log("User:", req.user);
    const { name } = req.body;
    const userId = req.user.id; // Access userId correctly
    // Make sure user is authenticated

    console.log(userId);
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Folder name is required" });
    }

    // Create a new folder and assign it to the user
    const newFolder = new Folder({
      name,
      userId,
    });

    const savedFolder = await newFolder.save();

    res.status(201).json({
      success: true,
      message: "Folder created successfully",
      folder: savedFolder,
    });
  } catch (error) {
    console.error("Error creating folder:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating folder",
    });
  }
};

// Create a form bot inside a folder
exports.createFormBot = async (req, res) => {
  const { folderId, formBotName, fields } = req.body;

  try {
    // Step 1: Find the folder by its ID
    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res
        .status(404)
        .json({ success: false, message: "Folder not found" });
    }

    // Step 2: Validate fields
    if (!fields || fields.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Form fields are required" });
    }

    // Step 3: Ensure bubbles have data and input fields are left empty
    fields.forEach((field) => {
      if (field.type === 'bubble') {
        if (!field.value) {
          throw new Error('Bubble fields must have prefilled data.');
        }
      } else if (field.type === 'input') {
        field.value = '';  // Make sure input fields are empty for user to fill later
      }
    });

    // Step 4: Create the form bot
    const newFormBot = new FormBot({
      name: formBotName,
      fields,  // Save all fields (bubbles and inputs) to DB
    });

    // Step 5: Save the form bot
    const savedFormBot = await newFormBot.save();

    // Step 6: Add the form bot to the folder
    folder.formBots.push(savedFormBot._id);  // Associate the form bot with the folder
    await folder.save();

    res.status(201).json({
      success: true,
      message: 'Form bot created successfully',
      formBot: savedFormBot,
    });
  } catch (error) {
    console.error('Error creating form bot:', error.message);
    res.status(500).json({ success: false, message: 'Error creating form bot' });
  }
};



// Get all folders for a user
// copiolit fecth the folders

// ...existing code...

// Get all folders for a user
// copiolit fecth the folders

// exports.getFolders = async (req, res) => {
//   try {
//     console.log('User ID:', req.user.id);
//     const id = req.user.id;  // Access userId correctly
//     const folders = await Folder.findById(id);
//     console.log('Folders:', folders); // Log the fetched folders
//     res.status(200).json({ success: true, folders });
//   } catch (error) {
//     console.error('Error fetching folders:', error); // Log the error
//     res.status(500).json({ success: false, message: 'Error fetching folders' });
//   }
// };

exports.getFolders = async (req, res) => {
  try {
    // console.log(req.user.id);

    const output = await Folder.find({ userId: req.user.id });
    res.status(200).json({ success: true, output });
  } catch (error) {
    console.log(error);
  }
};


//getting forms by folder id


exports.deleteFolderById = async (req, res) => {
    const { folderId } = req.params;
  
    try {
      // Find the folder to be deleted
      const folder = await Folder.findById(folderId);
      
      if (!folder) {
        return res.status(404).json({
          success: false,
          message: 'Folder not found',
        });
      }
  
      // Delete all forms inside the folder before deleting the folder
      await FormBot.deleteMany({ folder: folderId });
  
      // Delete the folder
      await Folder.findByIdAndDelete(folderId);
  
      res.status(200).json({
        success: true,
        message: 'Folder and associated forms deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting folder:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error deleting folder',
      });
    }
  };
  
  
    
exports.deleteFolderById = async (req, res) => {
    const { folderId } = req.params;
  
    try {
      // Find the folder to be deleted
      const folder = await Folder.findById(folderId);
      
      if (!folder) {
        return res.status(404).json({
          success: false,
          message: 'Folder not found',
        });
      }
  
      // Delete all forms inside the folder before deleting the folder
      await FormBot.deleteMany({ folder: folderId });
  
      // Delete the folder
      await Folder.findByIdAndDelete(folderId);
  
      res.status(200).json({
        success: true,
        message: 'Folder and associated forms deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting folder:', error.message);
      res.status(500).json({
        success: false,
        message: 'Error deleting folder',
      });
    }
  };
  
  
  
