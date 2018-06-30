# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  # vm definition taken from http://stackoverflow.com/a/21959961/1407371
  config.vm.define :vagrant_ansible do |machine|
    machine.vm.network :forwarded_port, guest: 3000, host: 3000
    machine.vm.hostname = "vagrant.machine"
  end

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "./provision/playbook.yml"
  end
end
