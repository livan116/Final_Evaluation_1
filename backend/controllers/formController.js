const Folder = require("../models/Folder");
const FormBot = require("../models/FormBot"); // Import FormBot model
const ShareableLink = require("../models/Share");
const FormResponse = require("../models/FormResponse");
const { v4: uuidv4 } = require("uuid");

exports.getFormsByFolderId = async (req, res) => {
  const { folderId } = req.params; // Get the folder ID from the request params
  console.log("Folder ID:", folderId);
  try {
    // Step 1: Find the folder by ID
    const folder = await Folder.findById(folderId).populate("formBots"); // Populate formBots in the folder

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    // Step 2: Return the form bots associated with this folder
    res.status(200).json({
      success: true,
      forms: folder.formBots, // All form bots associated with the folder
    });
  } catch (error) {
    console.error("Error fetching forms by folder ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching forms",
    });
  }
};

exports.getFormById = async (req, res) => {
  const { formId } = req.params; // Get formId from the request params

  try {
    // Find the form by formId
    const form = await FormBot.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Return the form data
    res.status(200).json({
      success: true,
      form, // Send the form details in the response
    });
  } catch (error) {
    console.error("Error fetching form by formId:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching form details",
    });
  }
};

exports.updateFormById = async (req, res) => {
  const { formId } = req.params; // Get formId from request params
  const { name, fields } = req.body; // Get form name and fields to be updated
  console.log("Form ID:", formId);
  try {
    // Step 1: Find the form by ID
    const form = await FormBot.findById(formId);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Step 2: Update form data
    form.name = name || form.name; // Update name if provided
    form.fields = fields; // Update the fields (bubbles and inputs)

    // Step 3: Save the updated form
    await form.save();

    // Step 4: Respond with success
    res.status(200).json({
      success: true,
      message: "Form updated successfully!",
      form: form,
    });
  } catch (error) {
    console.error("Error updating form:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating form",
    });
  }
};

// Delete Form by ID
exports.deleteFormById = async (req, res) => {
  const { formId } = req.params;

  try {
    // Find the form to be deleted
    const form = await FormBot.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Remove the form from its folder's formBots array
    await Folder.findByIdAndUpdate(form.folder, {
      $pull: { formBots: formId },
    });

    // Delete the form from the database
    await FormBot.findByIdAndDelete(formId);

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting form:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting form",
    });
  }
};

// POST: /api/forms/generate-share-link
exports.shareForm = async (req, res) => {
  try {
    const formId = req.params.formId; // Form ID passed in the request

    // Find the form by formId
    const form = await FormBot.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    // Generate a unique link (UUID)
    const shareableLinkId = uuidv4(); // Unique ID for the link

    // Save the shareable link and form reference in the database
    const shareableLink = new ShareableLink({
      form: form._id,
      linkId: shareableLinkId,
    });

    await shareableLink.save(); // Save the link in the database

    // Return the generated link to the frontend
    const fullLink = `${req.protocol}://${req.get(
      "host"
    )}/form/${shareableLinkId}`;
    res.json({
      success: true,
      link: fullLink,
      linkId: shareableLinkId,
    });
  } catch (error) {
    console.error("Error generating shareable link:", error);
    res.status(500).json({ message: "Error generating shareable link." });
  }
};

exports.getSharedForm = async (req, res) => {
  try {
    const { linkId } = req.params; // Get linkId from URL params

    // Find the shareable link by linkId
    const shareableLink = await ShareableLink.findOne({ linkId }).populate(
      "form"
    );

    if (!shareableLink) {
      return res.status(404).json({ message: "Form link not found." });
    }

    // Get the form from the reference
    const form = shareableLink.form;

    form.viewCount = (form.viewCount || 0) + 1;
    await form.save();

    // Sort the fields by sequence to maintain correct order
    const sortedFields = form.fields.sort((a, b) => a.sequence - b.sequence);

    // Return the form data
    res.json({
      success: true,
      form: {
        _id: form._id,
        name: form.name,
        fields: sortedFields,
      },
    });
  } catch (error) {
    console.error("Error retrieving form for chatbot:", error);
    res.status(500).json({ message: "Error fetching form data." });
  }
};

// Save form responses
exports.saveFormResponse = async (req, res) => {
  try {
    const { formId, responses } = req.body;
   

    // Check if form exists
    const form = await FormBot.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }
    console.log(responses.length);
    // If this is the first response (form is being started), increment the 'started' count
    if (responses && responses.length > 0) {
      // Check if it's the first response to trigger the 'started' increment
        form.startedCount += 1;
        await form.save();
      
    }

    // Save the form responses
    const formResponse = new FormResponse({
      form: formId,
      responses: responses,
    });

    await formResponse.save();

    console.log(responses)
    // Increment 'submitted' only if all responses are filled (form is completely submitted)
    const allResponsesSubmitted = responses.every(
      (response) => response.value !== undefined && response.value !== null
    );
    console.log(allResponsesSubmitted);
    if (!allResponsesSubmitted) {
      form.submittedCount += 1;
      await form.save();
    }

    res.json({ success: true, message: "Form responses saved successfully" });
  } catch (error) {
    console.error("Error saving form responses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Corrected implementation of getFormResponses to match your route structure
exports.getFormResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    
    // Find the form to get its fields structure
    const form = await FormBot.findById(formId);
    if (!form) {
      return res.status(404).json({ 
        success: false, 
        message: "Form not found" 
      });
    }
    
    // Find all responses for the given formId
    const formResponses = await FormResponse.find({ form: formId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Convert to plain JavaScript objects for better performance

    // Return formatted response
    res.status(200).json({
      success: true,
      data: formResponses,
      form: {
        _id: form._id,
        name: form.name,
        viewCount: form.viewCount || 0,
        startedCount: form.startedCount || 0,
        submittedCount: form.submittedCount || 0,
        fields: form.fields.sort((a, b) => a.sequence - b.sequence) // Sort fields by sequence
      }
    });
  } catch (error) {
    console.error("Error fetching form responses:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Implement saveFormResponse to match your schema structure
exports.saveFormResponse = async (req, res) => {
  try {
    const { formId, responses } = req.body;
   
    // Check if form exists
    const form = await FormBot.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }
    
    // If this is the first response (form is being started), increment the 'started' count
    if (responses && responses.length > 0) {
      form.startedCount = (form.startedCount || 0) + 1;
      await form.save();
    }

    // Transform responses to match the schema
    const formattedResponses = responses.map(response => ({
      label: response.label,
      answer: response.value // Map 'value' from the frontend to 'answer' in the schema
    }));
    
    // Save the form responses
    const formResponse = new FormResponse({
      form: formId,
      responses: formattedResponses,
    });

    await formResponse.save();

    // Check if all responses are filled (form is completely submitted)
    const allResponsesSubmitted = responses.every(
      (response) => response.value !== undefined && response.value !== null && response.value !== ""
    );
    
    if (allResponsesSubmitted) {
      form.submittedCount = (form.submittedCount || 0) + 1;
      await form.save();
    }

    res.json({ success: true, message: "Form responses saved successfully" });
  } catch (error) {
    console.error("Error saving form responses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

