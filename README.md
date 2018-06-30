# Measure It

This is a learning project for time tracking activities.

## Provisioning

You can use Vagrant and Ansible to configure a development environment with all what is needed:

- MySQL
- Ruby 2.3
- bundler
- NodeJS

After installing Vagrant, VirtualBox and Ansible just run:

```bash
$ vagrant up
```

Wait to the process to complete and then load the schema with:

```bash
$ rake db:schema:load
```