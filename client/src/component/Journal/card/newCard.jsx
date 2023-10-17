import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { addContact, updateContact } from "../../../redux/featuresJournal/journal/journalSlice";

import { IconPawFilled } from "@tabler/icons-react";
import { useDispatch, useSelector } from 'react-redux';

const NewCard = ({ id }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        telephone: yup.string().required(),
      })
    ),
  });

    const handleClose = () => {
      setOpen(false);
      navigate("/journal/all");
    };
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const contactData = useSelector((state) =>
    state.contact.contactList.find((contact) => contact.id === id)
  );

  useEffect(() => {
    if (contactData) {
    const { name, email, telephone } = contactData;
    setValue("name", name);
    setValue("email", email);
    setValue("telephone", telephone);
    }
  }, [contactData, register]);

  const onSubmit = (data) => {
    const { name, email, telephone } = data;

    if (id) {
      editContact(name, email, telephone);
    } else {
      dispatch(addContact({ name, email, telephone, id: uuidv4() }));
    }

    handleClose();
  };

  const editContact = (name, email, telephone) => {
    dispatch(updateContact({ name, email, telephone, id }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{id ? "Edit Contact" : "Add New Contact"}</DialogTitle>
      <DialogContent>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="telephone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                error={!!errors.telephone}
                helperText={errors.telephone?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<IconPawFilled />}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
    </DialogContent>
    </Dialog>
  );
};

export default NewCard;
